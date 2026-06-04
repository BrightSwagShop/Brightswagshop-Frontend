# Pipeline Documentation

## 1) Where the pipeline lives

- Workflow file: `.github/workflows/ci.yml`
- Workflow name in GitHub Actions: **Frontend CI/CD**
- Single job inside it: `build-test-analyze`

## 2) When it runs

The workflow triggers on:
- **Push** to any branch
- **Pull request** targeting `development` or `main`
- **Manual run** from the Actions tab (`workflow_dispatch`)

## 3) What happens step by step

Pipeline order in `ci.yml`:

1. **Checkout code**  
   Pulls the repo so the runner can build/test it.

2. **Setup Node.js + Chrome**  
   Installs Node `24.11.0` and headless Chrome for Playwright.

3. **Install dependencies**  
   Runs `npm ci` in `frontend/`.

4. **Security audit (non-blocking)**  
   Runs `npm audit --audit-level=high`.  
   It is marked `continue-on-error: true`, so findings do not fail the pipeline.

5. **Static quality checks**
   - `npm run lint`
   - `npx tsc --noEmit`

6. **Unit/component tests + coverage**  
   Runs `npm run test:run -- --coverage`.

7. **Publish test report + coverage artifact**
   - Publishes JUnit results (`frontend/junit.xml`)
   - Uploads coverage folder as artifact (`coverage-report`)

8. **SonarCloud analysis**
   - Uses `frontend/sonar-project.properties`
   - Sends quality analysis to SonarCloud

9. **Playwright E2E tests**
   - Installs browser: `npx playwright install --with-deps chromium`
   - Runs tests: `npm run webtests`
   - Uploads HTML report artifact (`playwright-report`)

10. **Email Playwright report summary**
    - Sends an email via SendGrid with link to the Actions run
    - This step is `if: always()` and **can fail the job** if SendGrid call fails

11. **Production build**
    - Runs `npm run build`

12. **Deploy to Render**
    - Calls Render deploy hook URL from secret

## 4) External systems connected

   - **TestRail** (Playwright reporting)
- **SonarCloud** (code quality)
- **SendGrid** (email notification)
- **Render** (deployment)

## 5) Required GitHub secrets

These must exist in repository settings (`Settings > Secrets and variables > Actions`):

- `SONAR_TOKEN`
- `TESTRAIL_BASE_URL`
- `TESTRAIL_USERNAME`
- `TESTRAIL_API_KEY`
- `SENDGRID_API_KEY`
- `RENDER_DEPLOY_HOOK`
- `ENTRA_ID_TENANT_ID`
- `ENTRA_ID_CLIENT_ID`
- `ENTRA_ID_CLIENT_SECRET`
- `ENTRA_ID_SCOPE` (optional, defaults to `<clientId>/.default`)

If one is missing, the related step fails.

## 6) How to read a failed run quickly

Open the failed GitHub Actions run and check in this order:

1. **First red step** in the job timeline
2. **Log output** for that step
3. **Artifacts** (coverage/playwright-report) if tests failed

Common failure buckets:
- Lint/type errors (`npm run lint`, `tsc`)
- Unit test failures (`npm run test:run`)
- E2E failures (`npm run webtests`)
- Secret/config failures (Sonar/TestRail/SendGrid/Render)

## 7) Reproduce the pipeline locally

From `frontend/`:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run test:run -- --coverage
npx playwright install --with-deps chromium
npm run webtests
npm run build
```

If local passes but pipeline fails, check:
- Missing secrets in GitHub
- External service outages (Sonar/TestRail/SendGrid/Render)
- Branch/PR trigger conditions

## 8) Important behavior to know

- **Push triggers deployment path** because `on: push` has no branch filter.
- **Audit step does not block merges** (`continue-on-error: true`).
- **Email step can fail the workflow** even when tests are green.
- Playwright tests auto-report to TestRail using env vars from secrets.

## 9) Useful links in every run

Inside each GitHub Actions run:
- **Summary tab**: quick pass/fail overview
- **Artifacts**: `coverage-report`, `playwright-report`
- **Annotations**: lint/test failures and file locations