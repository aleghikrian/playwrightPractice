import { Page } from "playwright";

export class Base {
  page: Page;
  signInHeaderButton;

  constructor(page: Page) {
    this.page = page;
    this.signInHeaderButton = page.locator('[data-test="nav-sign-in"]');
  }

  async goToHomePage() {
    await this.page.goto("/", { waitUntil: "commit" });
  }

  async goToSignInPage() {
    await this.signInHeaderButton.click();
  }
}
