#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process');

const isCI = !!(process.env.CI || process.env.RENDER);

function run(cmd, args, opts) {
  console.log('> ' + [cmd].concat(args || []).join(' '));
  const res = spawnSync(cmd, args || [], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...opts,
  });
  return res.status === null ? (res.error ? 1 : 0) : res.status;
}

function main() {
  if (isCI) {
    console.log('[runner] CI environment detected — installing Playwright browsers...');
    const installStatus = run('npx', ['playwright', 'install', 'chromium', '--with-deps']);
    if (installStatus !== 0) {
      console.error('[runner] Failed to install Playwright browsers (exit code ' + installStatus + ')');
      process.exit(installStatus);
    }
  }

  const testStatus = run('npx', ['playwright', 'test']);
  process.exit(testStatus === null ? 0 : testStatus);
}

main();
