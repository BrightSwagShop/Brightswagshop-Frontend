import { Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function parseAndApplyEnvFile(filePath: string): void {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const equalsIndex = line.indexOf('=');
    if (equalsIndex <= 0) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function ensureEnvLoaded(): void {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  const frontendRoot = resolve(currentFileDir, '..', '..');

  parseAndApplyEnvFile(resolve(frontendRoot, '.env'));
  parseAndApplyEnvFile(resolve(frontendRoot, '.env.local'));
}

/**
 * Response type from Azure AD token endpoint
 */
export interface AzureAdTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface AuthenticatedRequestResult {
  status: number;
  statusText: string;
  body: string;
  headers: Record<string, string>;
}

/**
 * EntraIdAuthHelper - Utility class for acquiring Azure AD/Entra ID tokens
 * and managing authenticated requests for API testing
 */
export class EntraIdAuthHelper {
  private static _cachedBearerToken: string | null = null;
  private static _tokenExpiresAt: Date | null = null;
  private readonly tenantId: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scope: string;

  constructor(tenantId: string, clientId: string, clientSecret: string, scope?: string) {
    this.tenantId = tenantId;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scope = scope || `${clientId}/.default`;
  }

  /**
   * Acquires a new token from Azure AD using client credentials flow
   * @returns Bearer token string
   * @throws Error if token acquisition fails
   */
  private async acquireNewTokenAsync(): Promise<string> {
    const tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

    const tokenRequest = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: this.scope,
    });

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenRequest.toString(),
      });

      if (!response.ok) {
        const errorContent = await response.text();
        throw new Error(
          `Retrieving access token failed with status code ${response.status}. Error: ${errorContent}`
        );
      }

      const tokenResponse: AzureAdTokenResponse = await response.json();

      if (!tokenResponse?.access_token) {
        throw new Error('Received invalid token response from Azure AD');
      }

      // Cache the token and expiration time
      EntraIdAuthHelper._cachedBearerToken = tokenResponse.access_token;
      EntraIdAuthHelper._tokenExpiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000);

      return tokenResponse.access_token;
    } catch (error) {
      throw new Error(
        `Failed to acquire authentication token from Azure AD. Endpoint: ${tokenEndpoint}. Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Gets a valid token, using cached token if available and not expired
   * @returns Valid bearer token
   */
  async getTokenAsync(): Promise<string> {
    // Return cached token if it's still valid
    if (
      EntraIdAuthHelper._cachedBearerToken &&
      EntraIdAuthHelper._tokenExpiresAt &&
      Date.now() < EntraIdAuthHelper._tokenExpiresAt.getTime() - 60_000
    ) {
      return EntraIdAuthHelper._cachedBearerToken;
    }

    // Otherwise acquire a new token
    return this.acquireNewTokenAsync();
  }

  /**
   * Clears the cached token
   */
  static clearCache(): void {
    EntraIdAuthHelper._cachedBearerToken = null;
    EntraIdAuthHelper._tokenExpiresAt = null;
  }

  /**
   * Makes an authenticated API request with the Bearer token
   * @param page Playwright page instance
   * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param url Full URL or path to the API endpoint
   * @param options Additional fetch options (body, headers, etc.)
   * @returns Response object
   */
  async makeAuthenticatedRequest(
    page: Page,
    method: string,
    url: string,
    options?: RequestInit
  ): Promise<AuthenticatedRequestResult> {
    const token = await this.getTokenAsync();

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    };

    return page.evaluate(
      async (params) => {
        const response = await fetch(params.url, {
          method: params.method,
          headers: params.headers,
          body: params.body,
          ...params.options,
        });
        return {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
          headers: Object.fromEntries(response.headers),
        };
      },
      {
        url,
        method,
        headers,
        body: options?.body,
        options,
      }
    );
  }

  /**
   * Makes a simple authenticated API request and returns parsed JSON
   * @param url Full URL or path to the API endpoint
   * @param method HTTP method (default: GET)
   * @returns Parsed response body
   */
  async getAsync<T>(url: string, method: string = 'GET'): Promise<T> {
    const token = await this.getTokenAsync();

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  }
}

/**
 * Creates an EntraIdAuthHelper instance from environment variables
 * Expects:
 * - ENTRA_ID_TENANT_ID
 * - ENTRA_ID_CLIENT_ID
 * - ENTRA_ID_CLIENT_SECRET
 */
export function createEntraIdAuthHelper(scope?: string): EntraIdAuthHelper {
  ensureEnvLoaded();

  const tenantId =
    process.env.ENTRA_ID_TENANT_ID ||
    process.env.AZURE_TENANT_ID ||
    process.env.VITE_AZURE_TENANT_ID;

  const clientId =
    process.env.ENTRA_ID_CLIENT_ID ||
    process.env.AZURE_CLIENT_ID ||
    process.env.VITE_AZURE_CLIENT_ID;

  const clientSecret =
    process.env.ENTRA_ID_CLIENT_SECRET ||
    process.env.VITE_AZURE_CLIENT_SECRET ||
    process.env.AZURE_CLIENT_SECRET ||
    process.env.CLIENT_SECRET;

  const resolvedScope = scope || process.env.ENTRA_ID_SCOPE || process.env.AZURE_SCOPE;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      'Missing required environment variables for EntraID authentication. ' +
        'Set ENTRA_ID_TENANT_ID (or VITE_AZURE_TENANT_ID), ENTRA_ID_CLIENT_ID (or VITE_AZURE_CLIENT_ID), and ENTRA_ID_CLIENT_SECRET (or VITE_AZURE_CLIENT_SECRET).'
    );
  }

  return new EntraIdAuthHelper(tenantId, clientId, clientSecret, resolvedScope);
}
