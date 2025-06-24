import { test, expect } from "@playwright/test";
import { Base } from "../../pages/base";
import { Login } from "../../pages/signIn";
import { Signup } from "../../pages/signup";

test("Successful Signup", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);
  const signup = new Signup(page);

  await test.step("Navigate to home page", async () => {
    await base.goToHomePage();
  });
  await test.step("Navigate to Sign in page", async () => {
    await base.goToSignInPage();
  });
  await test.step("Click on registration button", async () => {
    await login.clickRegisterButton();
  });
  await test.step("Ensure page is fully loaded before continuing", async () => {
    await page.waitForLoadState();
  });
  await test.step("Fill the signup form", async () => {
    await signup.fillSignupForm();
  });
  await test.step("Submit the signup form", async () => {
    await signup.confirmSignupForm();
  });
  await test.step("Confirm document was submitted and page went back to sign in", async () => {
    await signup.assertSignup();
  });
});
