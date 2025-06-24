import { Page, Locator, expect } from "@playwright/test";
import { Base } from "./base";
import { UserFields } from "./shared/UserFields";
import { createTestUser, TestUser } from "../utils/createTestUser";

export class Login extends Base {
  //Declaring locators
  readonly registerButton: Locator;
  readonly loginConfirmation: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly userFields: UserFields;

  constructor(page: Page) {
    super(page);
    this.userFields = new UserFields(page);
    this.registerButton = page.locator('[data-test="register-link"]');
    this.loginConfirmation = page.locator('[data-test="login-submit"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
    this.loginError = page.locator('[data-test="login-error"]');
  }

  /* This click the register button inside the Login Page */
  async clickRegisterButton() {
    await this.registerButton.waitFor({ state: "visible" });
    await this.registerButton.click({ force: true });
  }

  /* This uses an already created user to login into the application */
  /* NEED TO REFACTOR. CHANGED BEHAVIOR ON userFields. Deprecated .env so now we need to create a new way to fetch already created users
  This test will not work for now */
  async loginWithUser(user: TestUser) {
    await this.userFields.emailAddress.fill(user.email);
    await this.userFields.password.fill(user.password);
    await this.loginConfirmation.click();
  }

  /* Created a reusable function to validate errors based on fillable fields */
  async validateLoginTextError(locator: Locator, expectedText: string) {
    await expect(locator).toBeVisible();
    const errorText = await locator.innerText();
    await expect(errorText).toContain(expectedText);
  }

  /* Created a reusable function to fill either email or both email and password fields */
  async fillLoginCredentials(email: string, password?: string) {
    await this.userFields.emailAddress.fill(email);
    if (password) {
      await this.userFields.password.fill(password);
    }
    await this.loginConfirmation.click();
  }
}
