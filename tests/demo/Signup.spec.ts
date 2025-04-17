import { test, expect } from "@playwright/test";
import { Base } from "../../pages/base";
import { Login } from "../../pages/signIn";

test("Successful Signup", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.clickRegisterButton();
  await page.waitForLoadState();
  await login.fillSignupForm();
  await login.confirmSignupForm();
});
