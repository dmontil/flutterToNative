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
    const originalAssign = window.location.assign.bind(window.location);
    window.location.assign = (url: string | URL) => {
      (window as any).__lastCheckoutUrl = url.toString();
      // Intentionally do not navigate during tests
    };
    // Preserve original in case needed
    (window as any).__originalAssign = originalAssign;
  });
}

test.describe("Checkout Flow (Test Mode)", () => {
  test.skip(shouldSkip(), "E2E_TEST_SECRET not set");

  test("iOS checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#ios");

    const [checkoutResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/checkout") && res.request().method() === "POST"),
      page.getByRole("button", { name: "Get iOS Access" }).click(),
    ]);

    if (!checkoutResponse.ok()) {
      const body = await checkoutResponse.text();
      throw new Error(`Checkout API failed: ${checkoutResponse.status()} ${body}`);
    }

    await page.waitForFunction(() => (window as any).__lastCheckoutUrl);
    const url = await page.evaluate(() => (window as any).__lastCheckoutUrl);
    expect(url).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Android checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#android");

    const [checkoutResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/checkout") && res.request().method() === "POST"),
      page.getByRole("button", { name: "Get Android Access" }).click(),
    ]);

    if (!checkoutResponse.ok()) {
      const body = await checkoutResponse.text();
      throw new Error(`Checkout API failed: ${checkoutResponse.status()} ${body}`);
    }

    await page.waitForFunction(() => (window as any).__lastCheckoutUrl);
    const url = await page.evaluate(() => (window as any).__lastCheckoutUrl);
    expect(url).toMatch(/https:\/\/checkout\.stripe\.com/);
  });

  test("Bundle checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request);
    await prepareCheckoutCapture(page);
    await page.goto("/pricing#bundle");

    const [checkoutResponse] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/checkout") && res.request().method() === "POST"),
      page.getByRole("button", { name: "Get Bundle Access" }).click(),
    ]);

    if (!checkoutResponse.ok()) {
      const body = await checkoutResponse.text();
      throw new Error(`Checkout API failed: ${checkoutResponse.status()} ${body}`);
    }

    await page.waitForFunction(() => (window as any).__lastCheckoutUrl);
    const url = await page.evaluate(() => (window as any).__lastCheckoutUrl);
    expect(url).toMatch(/https:\/\/checkout\.stripe\.com/);
  });
});
