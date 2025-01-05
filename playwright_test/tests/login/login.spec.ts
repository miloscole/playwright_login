import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "./login.po";
import { DATA, URLS, INVALID_SCENARIOS } from "./login.data";

test.describe("Login functionality", () => {
  let testPage: LoginPage;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    testPage = new LoginPage(page);
    await page.goto(URLS.newSession);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("should verify the login page is shown", async () => {
    await expect(page).toHaveURL(URLS.newSession);
    const title = await testPage.getLoginLocator("title");
    await expect(title).toBeVisible();
  });

  test("should successfully log in with valid credentials", async () => {
    await test.step("Fill the login form with valid credentials", async () => {
      await testPage.fillLoginForm(
        DATA.existingUser.email,
        DATA.existingUser.password
      );
    });
    await test.step("Submit the login form", async () => {
      await testPage.submitLogin();
    });
    await test.step("Verify redirection to the welcome page", async () => {
      await expect(page).toHaveURL("/");
      await expect(await testPage.getDashboardLocator("welcome")).toBeVisible();
    });
  });

  test.describe("Invalid data", () => {
    INVALID_SCENARIOS.forEach(({ email, password, description }) => {
      test(`should display an error when ${description} provided`, async () => {
        await test.step("Verify no error message is visible initially", async () => {
          await expect(
            await testPage.getLoginLocator("error")
          ).not.toBeVisible();
        });
        await test.step("Fill the login form", async () => {
          await testPage.fillLoginForm(email, password);
        });
        await test.step("Submit and verify the error message", async () => {
          await testPage.submitLogin();
          await expect(await testPage.getLoginLocator("error")).toBeVisible();
        });
      });
    });
  });

  test.describe("Logout test", () => {
    test("should redirect to the login page after logout", async () => {
      await test.step("Log in and verify sign-out button visibility", async () => {
        await testPage.loginAsValidUser(
          DATA.existingUser.email,
          DATA.existingUser.password
        );
        await expect(
          await testPage.getDashboardLocator("logout")
        ).toBeVisible();
      });
      await test.step("Log out and verify redirection to the login page", async () => {
        await testPage.submitLogout();
        await expect(page).toHaveURL(URLS.newSession);
        await expect(
          await testPage.getDashboardLocator("logout")
        ).not.toBeVisible();
      });
      await test.step("Attempt access to protected page", async () => {
        await page.goto("/");
        await expect(page).toHaveURL(URLS.newSession);
      });
    });
  });
});
