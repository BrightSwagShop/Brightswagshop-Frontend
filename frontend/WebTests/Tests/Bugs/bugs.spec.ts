import { test, expect, APIRequestContext, Page, request as playwrightRequest } from '@playwright/test';

// API_BASE_URL is injected by TestAutomationService when tests run via the admin page.
// When running directly (e.g. `npx playwright test`), we auto-detect it from the first
// /api/ request the running frontend app makes, so tests always hit the right backend.
let resolvedApiBaseUrl = (process.env.API_BASE_URL || '').trim();

async function detectApiBaseUrl(page: Page): Promise<string> {
  if (resolvedApiBaseUrl) return resolvedApiBaseUrl;

  return new Promise<string>((resolve) => {
    const timeout = setTimeout(() => {
      page.off('request', handler);
      resolve('http://127.0.0.1:5076');
    }, 8_000);

    const handler = (req: import('@playwright/test').Request) => {
      const url = req.url();
      if (url.includes('/api/') && !url.includes('/api/debug')) {
        clearTimeout(timeout);
        page.off('request', handler);
        resolve(new URL(url).origin);
      }
    };
    page.on('request', handler);

    page.goto('/').catch(() => {});
  });
}

const ADMIN_HEADERS = {
  'X-User-Id': 'bug-test-admin',
  'X-User-Role': 'Admin',
};

async function getBugStates(ctx: APIRequestContext): Promise<Record<string, boolean>> {
  const res = await ctx.get(`${resolvedApiBaseUrl}/api/debug/settings`);
  return res.json();
}

async function ensureBugEnabled(ctx: APIRequestContext, bugKey: string): Promise<void> {
  const state = await getBugStates(ctx);
  if (!state[bugKey]) {
    await ctx.post(`${resolvedApiBaseUrl}/api/debug/toggle/${bugKey}`);
  }
}

async function ensureBugDisabled(ctx: APIRequestContext, bugKey: string): Promise<void> {
  const state = await getBugStates(ctx);
  if (state[bugKey]) {
    await ctx.post(`${resolvedApiBaseUrl}/api/debug/toggle/${bugKey}`);
  }
}

test.describe('Bug flags — Frontend behavior', () => {
  let apiCtx: APIRequestContext;
  const enabledBugs: string[] = [];

  test.beforeEach(async ({ page }) => {
    apiCtx = await playwrightRequest.newContext();
    enabledBugs.length = 0;
    // Ensure we know which backend this frontend is talking to
    resolvedApiBaseUrl = await detectApiBaseUrl(page);
  });

  test.afterEach(async () => {
    for (const bugKey of enabledBugs) {
      try {
        await ensureBugDisabled(apiCtx, bugKey);
      } catch (_) { /* best effort */ }
    }
    await apiCtx.dispose();
  });

  async function enableBug(bugKey: string): Promise<void> {
    const state = await getBugStates(apiCtx);
    if (!state[bugKey]) {
      // Bug was off — we're turning it on, so we own cleanup
      await apiCtx.post(`${resolvedApiBaseUrl}/api/debug/toggle/${bugKey}`);
      if (!enabledBugs.includes(bugKey)) enabledBugs.push(bugKey);
    }
    // Bug was already on (user manually enabled it) — leave it alone after the test
  }

  // ── Tests ──────────────────────────────────────────────────────────────────

  test('[Bug] brokenFavorites - favorites page shows unavailable error', async ({ page }) => {
    await enableBug('brokenFavorites');

    await page.goto('/favoriten');
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByText('Favorieten tijdelijk niet beschikbaar'),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('[Bug] productApiError - category page shows product load error', async ({ page }) => {
    await enableBug('productApiError');

    await page.goto('/category/mok');
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByRole('heading', { name: /producten konden niet geladen worden/i }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('[Bug] brokenImages - product images are not rendered when bug is active', async ({ page }) => {
    // Seed a test mug product so the category page has at least one item to display.
    let testProductId: string | null = null;
    try {
      const createRes = await apiCtx.post(`${resolvedApiBaseUrl}/api/products`, {
        headers: ADMIN_HEADERS,
        data: {
          $type: 'SimpleProduct',
          name: `Bug Test Mug ${Date.now()}`,
          description: 'Seeded for brokenImages bug test',
          price: 9.99,
          category: 'Drinkartikelen',
          productType: 'Mok',
          isActive: true,
          kleuren: [{
            kleur: 'Zwart',
            imageUrl: 'https://example.com/bug-test-mug.png',
            stock: 1,
            sku: `BUGTEST-${Date.now()}`,
          }],
        },
      });
      if (createRes.status() === 201) {
        const body = await createRes.json();
        testProductId = body.id ?? null;
      }
    } catch (_) { /* non-critical — test will still run against existing products */ }

    await enableBug('brokenImages');

    try {
      await page.goto('/category/mok');
      await page.waitForLoadState('networkidle');

      // Wait until the loading indicator is gone
      await expect(page.locator('text=Loading...').first()).not.toBeVisible({ timeout: 10_000 });

      // ProductCard only renders <img> when imageUrl is truthy.
      // With brokenImages on, all imageUrls are null → no images rendered in product cards.
      const productCardImages = page.locator('.grid .rounded-xl img');
      const count = await productCardImages.count();
      expect(
        count,
        'Expected zero product-card images when brokenImages bug is active (all imageUrls are null)',
      ).toBe(0);
    } finally {
      if (testProductId) {
        try {
          await apiCtx.delete(`${resolvedApiBaseUrl}/api/products/${testProductId}`, {
            headers: ADMIN_HEADERS,
          });
        } catch (_) { /* best effort */ }
      }
    }
  });
});
