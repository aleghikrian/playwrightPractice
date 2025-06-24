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
  async fillSignupForm() {
    await this.firstName.fill(testUser.firstName);
    await this.lastName.fill(testUser.lastName);
    await this.birthDate.fill(testUser.birthDate);
    await this.streetName.fill(testUser.streetName);
    await this.postalCode.fill(testUser.postalCode);
    await this.cityName.fill(testUser.cityName);
    await this.stateName.fill(testUser.stateName);
    await this.countryDropdown.selectOption("AX");
    await this.phoneNumber.fill(testUser.phoneNumber);
    await this.userFields.emailAddress.fill(testUser.email);
    await this.userFields.password.fill(testUser.password);
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
