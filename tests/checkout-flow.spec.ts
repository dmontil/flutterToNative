import { test, expect, Page, APIRequestContext } from "@playwright/test";

const E2E_SECRET = process.env.E2E_TEST_SECRET || "";
const TEST_EMAIL = process.env.E2E_TEST_EMAIL || "e2e-test@fluttertonative.pro";

function shouldSkip() {
  return !E2E_SECRET;
}

async function loginViaMagicLink(page: Page, request: APIRequestContext, redirectPath: string) {
  const response = await request.post("/api/e2e/login", {
    headers: {
      "x-e2e-secret": E2E_SECRET,
      "Content-Type": "application/json",
    },
    data: {
      email: TEST_EMAIL,
      redirectTo: `${process.env.E2E_BASE_URL || "http://localhost:3002"}/auth/callback?redirect=${encodeURIComponent(redirectPath)}`,
    },
  });

  expect(response.ok()).toBeTruthy();
  const { actionLink } = await response.json();
  expect(actionLink).toBeTruthy();

  await page.goto(actionLink);
  await page.waitForURL(new RegExp(redirectPath.replace(/\//g, "\\/")));
}

test.describe("Checkout Flow (Test Mode)", () => {
  test.skip(shouldSkip(), "E2E_TEST_SECRET not set");

  test("iOS checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request, "/pricing");
    await page.goto("/pricing#ios");

    await page.getByRole("button", { name: "Get iOS Access" }).click();
    await page.waitForURL(/checkout\.stripe\.com/);
  });

  test("Android checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request, "/pricing");
    await page.goto("/pricing#android");

    await page.getByRole("button", { name: "Get Android Access" }).click();
    await page.waitForURL(/checkout\.stripe\.com/);
  });

  test("Bundle checkout button reaches Stripe", async ({ page, request }) => {
    await loginViaMagicLink(page, request, "/pricing");
    await page.goto("/pricing#bundle");

    await page.getByRole("button", { name: "Get Bundle Access" }).click();
    await page.waitForURL(/checkout\.stripe\.com/);
  });
});
