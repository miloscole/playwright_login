import { Locator, Page } from "@playwright/test";
import { DashboardSelectors, LoginSelectors } from "../../utils/types";
import { URLS } from "./login.data";

export class LoginPage {
  private page: Page;
  private selector: string;

  constructor(page: Page) {
    this.page = page;
  }

  async fillLoginForm(email: string, password: string): Promise<void> {
    await (await this.getLoginLocator("email")).fill(email);
    await (await this.getLoginLocator("password")).fill(password);
  }

  async getDashboardLocator(field: keyof DashboardSelectors): Promise<Locator> {
    this.selector = (
      await this.getSelectors<DashboardSelectors>(URLS.dashboardSelectors)
    )[field];
    return this.page.locator(this.selector);
  }

  async getLoginLocator(field: keyof LoginSelectors): Promise<Locator> {
    this.selector = (
      await this.getSelectors<LoginSelectors>(URLS.loginSelectors)
    )[field];
    return this.page.locator(this.selector);
  }

  async loginAsValidUser(email: string, password: string): Promise<void> {
    await this.fillLoginForm(email, password);
    await this.submitLogin();
  }

  async submitLogin(): Promise<void> {
    await (await this.getLoginLocator("login")).click();
  }

  async submitLogout(): Promise<void> {
    await (await this.getDashboardLocator("logout")).click();
  }

  private async getSelectors<T>(url: string): Promise<T> {
    const response = await this.page.request.get(url);
    const json = await response.json();
    return json as T;
  }
}
