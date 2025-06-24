import { Page, Locator } from "@playwright/test";

export class UserFields {
  readonly emailAddress: Locator;
  readonly password: Locator;

  constructor(protected page: Page) {
    this.emailAddress = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
  }
}
