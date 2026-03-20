import { test, expect, Page, request as playwrightRequest } from "@playwright/test";

/**
 * Tests del flujo de checkout intent.
 *
 * Flujo que validan:
 *   1. Usuario no logueado clickea "Buy" → intent guardado en sessionStorage → redirige a /login
 *   2. Auth callback con intent pendiente → llama /api/checkout automáticamente → navega a Stripe
 *   3. Auth callback sin intent → redirige a /pricing
 *   4. La moneda seleccionada se preserva en el intent
 *
 * Tests 1 y 4 no requieren credenciales.
 * Tests 2 y 3 requieren E2E_TEST_SECRET (se saltean si no está configurado).
 */

const E2E_SECRET = process.env.E2E_TEST_SECRET ?? "";
const TEST_EMAIL =
  process.env.E2E_TEST_EMAIL ?? "e2e-test@fluttertonative.pro";
const BASE_URL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3002";

// ---------------------------------------------------------------------------
// Helper: inyecta una sesión real en localStorage via el endpoint e2e
// ---------------------------------------------------------------------------
async function loginViaMagicLink(page: Page) {
  const api = await playwrightRequest.newContext({ baseURL: BASE_URL });

  const response = await api.post("/api/e2e/login", {
    headers: {
      "x-e2e-secret": E2E_SECRET,
      "Content-Type": "application/json",
    },
    data: { email: TEST_EMAIL },
  });

  if (!response.ok()) {
    throw new Error(
      `E2E login failed: ${response.status()} ${await response.text()}`
    );
  }

  const { session, storageKey } = await response.json();
  expect(session?.access_token).toBeTruthy();

  // Inyecta la sesión antes de que cargue la siguiente página
  await page.addInitScript(
    ({ key, value }: { key: string; value: unknown }) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { key: storageKey, value: session }
  );

  await api.dispose();
}

// ---------------------------------------------------------------------------
// Tests que NO requieren credenciales
// ---------------------------------------------------------------------------
test.describe("Checkout Intent — sin credenciales", () => {
  test("unauthenticated: 'Get iOS Access' guarda checkout_intent y redirige a /login", async ({
    page,
  }) => {
    await page.goto("/pricing");
    // Esperar a que UserProvider confirme que no hay sesión
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: "Get iOS Access" }).click();

    // Debe redirigir a /login
    await expect(page).toHaveURL(/\/login/);

    // sessionStorage debe tener el intent con los datos correctos
    const raw = await page.evaluate(() =>
      sessionStorage.getItem("checkout_intent")
    );
    expect(raw).not.toBeNull();

    const intent = JSON.parse(raw!);
    expect(intent.productId).toBe("ios_playbook");
    expect(intent.currency).toBe("USD");
  });

  test("unauthenticated: 'Get Android Access' guarda productId android", async ({
    page,
  }) => {
    await page.goto("/pricing");
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: "Get Android Access" }).click();

    await expect(page).toHaveURL(/\/login/);

    const raw = await page.evaluate(() =>
      sessionStorage.getItem("checkout_intent")
    );
    const intent = JSON.parse(raw!);
    expect(intent.productId).toBe("android_playbook");
  });

  test("unauthenticated: 'Get Bundle Access' guarda productId bundle", async ({
    page,
  }) => {
    await page.goto("/pricing");
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: "Get Bundle Access" }).click();

    await expect(page).toHaveURL(/\/login/);

    const raw = await page.evaluate(() =>
      sessionStorage.getItem("checkout_intent")
    );
    const intent = JSON.parse(raw!);
    expect(intent.productId).toBe("bundle_playbook");
  });

  test("currency EUR se preserva en el checkout_intent", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForTimeout(500);

    // Cambiar a EUR
    await page.getByRole("button", { name: "EUR (€)" }).click();
    await page.waitForTimeout(300);

    await page.getByRole("button", { name: "Get iOS Access" }).click();

    await expect(page).toHaveURL(/\/login/);

    const raw = await page.evaluate(() =>
      sessionStorage.getItem("checkout_intent")
    );
    const intent = JSON.parse(raw!);
    expect(intent.currency).toBe("EUR");
    expect(intent.productId).toBe("ios_playbook");
  });
});

// ---------------------------------------------------------------------------
// Tests que SÍ requieren credenciales (E2E_TEST_SECRET)
// ---------------------------------------------------------------------------
test.describe("Checkout Intent — con sesión real", () => {
  test.skip(!E2E_SECRET, "E2E_TEST_SECRET no configurado — saltando tests");

  test("auth/callback SIN intent redirige a /pricing", async ({ page }) => {
    await loginViaMagicLink(page);

    // Asegurar que NO haya intent en sessionStorage
    await page.addInitScript(() => {
      sessionStorage.removeItem("checkout_intent");
    });

    await page.goto("/auth/callback");

    await expect(page).toHaveURL(/\/pricing/, { timeout: 15000 });
  });

  test("auth/callback CON intent llama /api/checkout y navega a Stripe", async ({
    page,
  }) => {
    await loginViaMagicLink(page);

    // Inyectar el intent en sessionStorage
    await page.addInitScript(() => {
      sessionStorage.setItem(
        "checkout_intent",
        JSON.stringify({ productId: "ios_playbook", currency: "USD" })
      );
    });

    // Mockear /api/checkout para evitar llamar a Stripe real
    await page.route("**/api/checkout", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "https://checkout.stripe.com/c/pay/e2e_test_session",
        }),
      });
    });

    // Interceptar la navegación a Stripe para que no salga del test
    await page.route("https://checkout.stripe.com/**", (route) =>
      route.abort()
    );

    // Escuchar el request a Stripe ANTES de navegar
    const stripeRequestPromise = page.waitForRequest(
      /checkout\.stripe\.com/,
      { timeout: 15000 }
    );

    await page.goto("/auth/callback");

    const stripeRequest = await stripeRequestPromise;
    expect(stripeRequest.url()).toContain("checkout.stripe.com");

    // El intent debe haberse limpiado del sessionStorage
    const intentAfter = await page.evaluate(() =>
      sessionStorage.getItem("checkout_intent")
    );
    expect(intentAfter).toBeNull();
  });

  test("auth/callback CON intent: el body del checkout incluye productId y currency correctos", async ({
    page,
  }) => {
    await loginViaMagicLink(page);

    await page.addInitScript(() => {
      sessionStorage.setItem(
        "checkout_intent",
        JSON.stringify({ productId: "bundle_playbook", currency: "EUR" })
      );
    });

    let capturedBody: Record<string, string> | null = null;

    await page.route("**/api/checkout", async (route) => {
      const body = route.request().postDataJSON();
      capturedBody = body;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "https://checkout.stripe.com/c/pay/e2e_test_bundle",
        }),
      });
    });

    await page.route("https://checkout.stripe.com/**", (route) =>
      route.abort()
    );

    await page.waitForRequest(/checkout\.stripe\.com/, { timeout: 15000 });
    await page.goto("/auth/callback");

    // Esperar a que el request sea procesado
    await page.waitForTimeout(2000);

    expect(capturedBody).not.toBeNull();
    expect(capturedBody!.productId).toBe("bundle_playbook");
    expect(capturedBody!.currency).toBe("EUR");
  });

  test("auth/callback: si /api/checkout falla, cae a /pricing sin romper", async ({
    page,
  }) => {
    await loginViaMagicLink(page);

    await page.addInitScript(() => {
      sessionStorage.setItem(
        "checkout_intent",
        JSON.stringify({ productId: "ios_playbook", currency: "USD" })
      );
    });

    // Simular error del servidor
    await page.route("**/api/checkout", (route) => {
      route.fulfill({ status: 500, body: "Internal Error" });
    });

    await page.goto("/auth/callback");

    // Debe caer gracefully a /pricing
    await expect(page).toHaveURL(/\/pricing/, { timeout: 15000 });
  });
});
