/**
 * QMetry Integration Script for Playwright Test Results
 * Uploads test results to QMetry Test Management in Jira
 */

import fs from 'fs';
import https from 'https';

// Configuration - Read from environment variables
const config = {
  jiraUrl: process.env.QMETRY_JIRA_URL || 'https://your-domain.atlassian.net',
  apiKey: process.env.QMETRY_API_KEY,
  // API Token is optional - some QMetry setups only use API Key
  apiToken: process.env.QMETRY_API_TOKEN,
  projectKey: process.env.QMETRY_PROJECT_KEY,
  testCycleKey: process.env.QMETRY_TEST_CYCLE_KEY,
  releaseKey: process.env.QMETRY_RELEASE_KEY,
  environment: process.env.QMETRY_ENVIRONMENT || 'Automation',
  buildNumber: process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || 'local',
};

// QMetry API endpoint
const QMETRY_API_URL = `${config.jiraUrl}/rest/qtm4j/latest/automation`;

/**
 * Upload test results to QMetry
 */
async function uploadToQMetry() {
  console.log('📤 Starting QMetry upload...');
  
  // Validate configuration
  if (!config.apiKey) {
    console.error('❌ Error: QMETRY_API_KEY must be set');
    console.error('   Get your API key from: Jira → QMetry → Automation API');
    process.exit(1);
  }

  if (!config.projectKey) {
    console.error('❌ Error: QMETRY_PROJECT_KEY must be set');
    process.exit(1);
  }

  // Log authentication method
  if (config.apiToken) {
    console.log('🔐 Using API Key + Token authentication');
  } else {
    console.log('🔐 Using API Key authentication');
  }

  // Check if test results exist
  const junitPath = './test-results/junit-report.xml';
  const jsonPath = './test-results/results.json';

  if (!fs.existsSync(junitPath)) {
    console.error(`❌ Error: Test results not found at ${junitPath}`);
    process.exit(1);
  }

  try {
    // Read test results
    const junitXml = fs.readFileSync(junitPath, 'utf8');
    const jsonResults = fs.existsSync(jsonPath) 
      ? JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
      : null;

    console.log('📋 Test results loaded successfully');
    
    // Prepare data for QMetry
    const formData = prepareQMetryPayload(junitXml, jsonResults);

    // Upload to QMetry
    await uploadResults(formData);
    
    console.log('✅ Test results uploaded to QMetry successfully!');
    
  } catch (error) {
    console.error('❌ Error uploading to QMetry:', error.message);
    process.exit(1);
  }
}

/**
 * Prepare payload for QMetry
 */
function prepareQMetryPayload(junitXml, jsonResults) {
  const metadata = {
    projectKey: config.projectKey,
    testCycleKey: config.testCycleKey,
    releaseKey: config.releaseKey,
    environment: config.environment,
    buildNumber: config.buildNumber,
    platform: process.platform,
    executionTime: new Date().toISOString(),
  };

  // Remove undefined values
  Object.keys(metadata).forEach(key => 
    metadata[key] === undefined && delete metadata[key]
  );

  return {
    file: junitXml,
    metadata: JSON.stringify(metadata),
    format: 'junit'
  };
}

/**
 * Upload results using QMetry API
 */
function uploadResults(payload) {
  return new Promise((resolve, reject) => {
    const url = new URL(QMETRY_API_URL + '/importresults');
    
    // Create authentication header
    // If apiToken exists, use API Key + Token (Basic Auth)
    // Otherwise, use just API Key (Bearer token)
    let authHeader;
    if (config.apiToken) {
      const auth = Buffer.from(`${config.apiKey}:${config.apiToken}`).toString('base64');
      authHeader = `Basic ${auth}`;
    } else {
      authHeader = `apiKey ${config.apiKey}`;
    }
    
    // Create boundary for multipart/form-data
    const boundary = `----QMetryBoundary${Date.now()}`;
    
    // Build multipart body
    let body = '';
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="file"; filename="results.xml"\r\n`;
    body += `Content-Type: application/xml\r\n\r\n`;
    body += payload.file;
    body += `\r\n--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="metadata"\r\n\r\n`;
    body += payload.metadata;
    body += `\r\n--${boundary}--\r\n`;

    const options = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    console.log(`🔄 Uploading to: ${url.href}`);

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('📊 Response:', data);
          resolve(data);
        } else {
          reject(new Error(`Upload failed with status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// Run the upload
uploadToQMetry();
