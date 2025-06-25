import { Page } from "@playwright/test";
import { Base } from "../pages/base";
import { Signup } from "../pages/signup";
import { Login } from "../pages/signIn";
import { createTestUser, TestUser } from "./createTestUser";

/**
 * Registers and logs in a fresh user in one flow.
 */
export async function registerAndLoginUser(page: Page): Promise<TestUser> {
  const user = createTestUser();
  const base = new Base(page);
  const login = new Login(page);
  const signup = new Signup(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.clickRegisterButton();
  await page.waitForLoadState();
  await signup.fillSignupForm(user);
  await signup.confirmSignupForm();
  await signup.assertSignup();

  await login.loginWithUser(user);

  return user;
}

export async function registerUserUI(page: Page, user: TestUser) {
  const base = new Base(page);
  const signup = new Signup(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.clickRegisterButton();
  await signup.fillSignupForm(user);
  await signup.confirmSignupForm();
  await signup.assertSignup();
}
