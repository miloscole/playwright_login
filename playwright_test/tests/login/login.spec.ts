import { test, expect } from "@playwright/test";

test("should verify the login page is shown", async ({ page }) => {
  const selectors: { welcome: string; logout: string } = await (
    await page.request.get("/login_selectors")
  ).json();

  console.log(selectors);

  await page.goto("/session/new");

  await expect(page).toHaveTitle(/Rails Login/);
});
