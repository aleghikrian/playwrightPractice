import { Page, Locator, expect } from "@playwright/test";
import { Base } from "./base";
import dotenv from "dotenv";
import { exists } from "fs";
dotenv.config();

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
  readonly emailAddress: Locator;
  readonly password: Locator;
  readonly registerConfirmation: Locator;
  readonly loginConfirmation: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    super(page);
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
    this.emailAddress = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
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
  /* This fills the signup form completely with valid data for a positive test */
  async fillSignupForm() {
    await this.firstName.fill(process.env.FIRST_NAME || "DefaultName");
    await this.lastName.fill(process.env.LAST_NAME || "DefaultLastName");
    await this.birthDate.fill(process.env.BIRTH_DATE || "DefaultBirthDate");
    await this.streetName.fill(process.env.STREET_NAME || "DefaultStreetName");
    await this.postalCode.fill(process.env.POSTAL_CODE || "DefaultPostalCode");
    await this.cityName.fill(process.env.CITY_NAME || "DefaultCityName");
    await this.stateName.fill(process.env.STATE_NAME || "DefaultStateName");
    await this.countryDropdown.selectOption("AX");
    await this.phoneNumber.fill(
      process.env.PHONE_NUMBER || "DefaultPhoneNumber"
    );
    await this.emailAddress.fill(
      process.env.EMAIL_ADDRESS || "DefaultEmailAddress"
    );

    await this.password.fill(
      process.env.PASSWORD || "D3faultPasswordThatWillWorkPlease!"
    );
  }

  /* This clicks the register button inside the Registration Page, submitting the form */
  async confirmSignupForm() {
    await this.registerConfirmation.waitFor({ state: "attached" });
    await this.registerConfirmation.click({ force: true });
  }
  /* This uses an already created user to login into the application */
  async loginCreatedUser() {
    await this.emailAddress.fill(
      process.env.EMAIL_ADDRESS || "DefaultEmailAddress"
    );
    await this.password.fill(
      process.env.PASSWORD || "D3faultPasswordThatWillWorkPlease!"
    );
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
    await this.emailAddress.fill(email);
    if (password) {
      await this.password.fill(password);
    }
    await this.loginConfirmation.click();


  }

  notFormatted(){console.log("ok")}
  
}
