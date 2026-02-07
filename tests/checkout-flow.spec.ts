import { test, expect, Page, APIRequestContext } from "@playwright/test";

const E2E_SECRET = process.env.E2E_TEST_SECRET || "";
const TEST_EMAIL = process.env.E2E_TEST_EMAIL || "e2e-test@fluttertonative.pro";

function shouldSkip() {
  return !E2E_SECRET;
}

async function loginViaMagicLink(page: Page, request: APIRequestContext) {
  const response = await request.post("/api/e2e/login", {
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
}

async function prepareCheckoutCapture(page: Page) {
  await page.addInitScript(() => {
    (window as any).__lastCheckoutUrl = null;
    (window as any).__lastCheckoutResponse = null;
    const originalAssign = window.location.assign.bind(window.location);
    window.location.assign = (url: string | URL) => {
      (window as any).__lastCheckoutUrl = url.toString();
      // Intentionally do not navigate during tests
    };
    // Preserve original in case needed
    (window as any).__originalAssign = originalAssign;

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const res = await originalFetch(input, init);
      try {
        const url = typeof input === "string" ? input : (input as Request).url;
        if (url.includes("/api/checkout")) {
          const cloned = res.clone();
          const text = await cloned.text();
          (window as any).__lastCheckoutResponse = { status: res.status, text };
        }
      } catch {
        // ignore
      }
      return res;
    };
  });
}

test.describe("Checkout Flow (Test Mode)", () => {
  test.skip(shouldSkip(), "E2E_TEST_SECRET not set");

  test("iOS checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#ios");

    await page.getByRole("button", { name: "Get iOS Access" }).click();

    await page.waitForFunction(() => (window as any).__lastCheckoutResponse || (window as any).__lastCheckoutUrl);
    const { response, url } = await page.evaluate(() => ({
      response: (window as any).__lastCheckoutResponse,
      url: (window as any).__lastCheckoutUrl,
    }));

    if (response && response.status >= 400) {
      throw new Error(`Checkout API failed: ${response.status} ${response.text}`);
    }

    const finalUrl = url || (response?.text ? JSON.parse(response.text).url : null);
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Android checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#android");

    await page.getByRole("button", { name: "Get Android Access" }).click();

    await page.waitForFunction(() => (window as any).__lastCheckoutResponse || (window as any).__lastCheckoutUrl);
    const { response, url } = await page.evaluate(() => ({
      response: (window as any).__lastCheckoutResponse,
      url: (window as any).__lastCheckoutUrl,
    }));

    if (response && response.status >= 400) {
      throw new Error(`Checkout API failed: ${response.status} ${response.text}`);
    }

    const finalUrl = url || (response?.text ? JSON.parse(response.text).url : null);
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Bundle checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#bundle");

    await page.getByRole("button", { name: "Get Bundle Access" }).click();

    await page.waitForFunction(() => (window as any).__lastCheckoutResponse || (window as any).__lastCheckoutUrl);
    const { response, url } = await page.evaluate(() => ({
      response: (window as any).__lastCheckoutResponse,
      url: (window as any).__lastCheckoutUrl,
    }));

    if (response && response.status >= 400) {
      throw new Error(`Checkout API failed: ${response.status} ${response.text}`);
    }

    const finalUrl = url || (response?.text ? JSON.parse(response.text).url : null);
    expect(finalUrl).toBeTruthy();
    expect(finalUrl).toMatch(/https:\/\/checkout\.stripe\.com/);
  });
});
