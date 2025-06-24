import { Page, Locator, expect } from "@playwright/test";
import { Base } from "./base";
import { UserFields } from "./shared/UserFields";
import { createTestUser, TestUser } from "../utils/createTestUser";

export class Signup extends Base {
  //declaring locators
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
  readonly userFields: UserFields;

  constructor(page: Page) {
    super(page);
    this.userFields = new UserFields(page);
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.birthDate = page.locator('[data-test="dob"]');
    this.streetName = page.locator('[data-test="street"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.cityName = page.locator('[data-test="city"]');
    this.stateName = page.locator('[data-test="state"]');
    this.countryDropdown = page.locator('[data-test="country"]');
    this.phoneNumber = page.locator('[data-test="phone"]');
    this.registerConfirmation = page.locator('[data-test="register-submit"]');
  }

  /* This fills the signup form completely with valid data for a positive test */
  async fillSignupForm(user: Partial<TestUser> = {}) {
    const defaultUser = createTestUser();
    const finalUser = { ...defaultUser, ...user };

    await this.firstName.fill(finalUser.firstName);
    await this.lastName.fill(finalUser.lastName);
    await this.birthDate.fill(finalUser.birthDate);
    await this.streetName.fill(finalUser.streetName);
    await this.postalCode.fill(finalUser.postalCode);
    await this.cityName.fill(finalUser.cityName);
    await this.stateName.fill(finalUser.stateName);
    await this.countryDropdown.selectOption("AX");
    await this.phoneNumber.fill(finalUser.phoneNumber);
    await this.userFields.emailAddress.fill(finalUser.email);
    await this.userFields.password.fill(finalUser.password);
  }

  /* This clicks the register button inside the Registration Page, submitting the form */
  async confirmSignupForm() {
    await this.registerConfirmation.waitFor({ state: "attached" });
    await this.registerConfirmation.click({ force: true });
  }

  async assertSignup() {
    await this.page.waitForURL("**/auth/login", { waitUntil: "load" });
    await expect(this.page).toHaveURL(
      "https://practicesoftwaretesting.com/auth/login",
    );
  }
}
