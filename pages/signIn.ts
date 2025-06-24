import { Page, Locator, expect } from "@playwright/test";
import { Base } from "./base";
import { UserFields } from "./shared/UserFields";

const email = `alexis_${Date.now()}_${Math.random().toString(36).slice(-4)}@test.com`;

const randomPassword = [
  "A", // ensure uppercase
  "z", // ensure lowercase
  "7", // ensure number
  "@", // ensure special character
  Math.random().toString(36).slice(-8), // add some randomness
]
  .sort(() => 0.5 - Math.random()) // shuffle the characters
  .join("");

const testUser = {
  firstName: "Alexis",
  lastName: "Galeano",
  birthDate: "2000-01-01",
  streetName: "Main Street",
  postalCode: "12345",
  cityName: "Buenos Aires",
  stateName: "CABA",
  phoneNumber: "541112345678",
  email: email,
  password: randomPassword,
};

export class Login extends Base {
  //Declaring locators
  readonly registerButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly birthDate: Locator;
  readonly streetName: Locator;
  readonly postalCode: Locator;
  readonly cityName: Locator;
  readonly stateName: Locator;
  readonly countryDropdown: Locator;
  readonly phoneNumber: Locator;
  readonly registerConfirmation: Locator;
  readonly loginConfirmation: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly userFields: UserFields;

  constructor(page: Page) {
    super(page);
    this.userFields = new UserFields(page);
    this.registerButton = page.locator('[data-test="register-link"]');
    this.firstName = page.locator("input#firstName");
    this.lastName = page.locator('[data-test="last-name"]');
    this.birthDate = page.locator('[data-test="dob"]');
    this.streetName = page.locator('[data-test="street"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.cityName = page.locator('[data-test="city"]');
    this.stateName = page.locator('[data-test="state"]');
    this.countryDropdown = page.locator('[data-test="country"]');
    this.phoneNumber = page.locator('[data-test="phone"]');
    this.registerConfirmation = page.locator('[data-test="register-submit"]');
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
  async loginCreatedUser() {
    await this.userFields.emailAddress.fill(testUser.email);
    await this.userFields.password.fill(testUser.email);
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
