import { test, expect, Page, request as playwrightRequest } from "@playwright/test";

const E2E_SECRET = process.env.E2E_TEST_SECRET || "";
const TEST_EMAIL = process.env.E2E_TEST_EMAIL || "e2e-test@fluttertonative.pro";
const BASE_URL = process.env.E2E_BASE_URL || "http://127.0.0.1:3002";

function shouldSkip() {
  return !E2E_SECRET;
}

async function loginViaMagicLink(page: Page) {
  const api = await playwrightRequest.newContext({ baseURL: BASE_URL });
  const response = await api.post("/api/e2e/login", {
    headers: {
      "x-e2e-secret": E2E_SECRET,
      "Content-Type": "application/json",
    },
    data: {
      email: TEST_EMAIL,
    },
  });

  if (!response.ok()) {
    const body = await response.text();
    throw new Error(`E2E login failed: ${response.status()} ${body}`);
  }
  const { session, storageKey } = await response.json();
  expect(session?.access_token).toBeTruthy();
  expect(storageKey).toBeTruthy();

  await page.addInitScript(({ key, value }) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, { key: storageKey, value: session });

  await api.dispose();
}

async function prepareCheckoutCapture(page: Page) {
  await page.addInitScript(() => {
    // Enable E2E test mode to prevent navigation
    (window as any).__e2e_test_mode = true;
    (window as any).__e2e_checkout_url = null;
  });
}

test.describe("Checkout Flow (Test Mode)", () => {
  test.skip(shouldSkip(), "E2E_TEST_SECRET not set");

  test("iOS checkout button reaches Stripe", async ({ page }) => {
    await loginViaMagicLink(page);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#ios");

    // Wait a bit for page to stabilize
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Get iOS Access" }).click();

    // Wait for checkout URL to be captured with increased timeout
    await page.waitForFunction(() => (window as any).__e2e_checkout_url, { timeout: 20000 });
    
    const checkoutUrl = await page.evaluate(() => (window as any).__e2e_checkout_url);

    expect(checkoutUrl).toBeTruthy();
    expect(checkoutUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Android checkout button reaches Stripe", async ({ page }) => {
    await loginViaMagicLink(page);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#android");

    // Wait a bit for page to stabilize
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Get Android Access" }).click();

    // Wait for checkout URL to be captured with increased timeout
    await page.waitForFunction(() => (window as any).__e2e_checkout_url, { timeout: 20000 });
    
    const checkoutUrl = await page.evaluate(() => (window as any).__e2e_checkout_url);

    expect(checkoutUrl).toBeTruthy();
    expect(checkoutUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Bundle checkout button reaches Stripe", async ({ page }) => {
    await loginViaMagicLink(page);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#bundle");

    // Wait a bit for page to stabilize
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Get Bundle Access" }).click();

    // Wait for checkout URL to be captured with increased timeout
    await page.waitForFunction(() => (window as any).__e2e_checkout_url, { timeout: 20000 });
    
    const checkoutUrl = await page.evaluate(() => (window as any).__e2e_checkout_url);

    expect(checkoutUrl).toBeTruthy();
    expect(checkoutUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });
});
