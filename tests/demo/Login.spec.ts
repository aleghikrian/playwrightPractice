import { test, expect } from "@playwright/test";
import { Base } from "../../pages/base";
import { Login } from "../../pages/signIn";
import { createTestUser } from "../../utils/createTestUser";

test("@smoke Successfull Login", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);
  const user = createTestUser();

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.loginCreatedUser(user);
});

test("Invalid Email Format", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.fillLoginCredentials("no-format");
  await login.validateLoginTextError(
    login.emailError,
    "Email format is invalid",
  );
});

test("Email field is required", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.fillLoginCredentials("");
  await login.validateLoginTextError(login.emailError, "Email is required");
});

test("Password field is required", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.fillLoginCredentials("testemail@test.com");
  await login.validateLoginTextError(
    login.passwordError,
    "Password is required",
  );
});

test("Invalid email or password", async ({ page }) => {
  const base = new Base(page);
  const login = new Login(page);

  await base.goToHomePage();
  await base.goToSignInPage();
  await login.fillLoginCredentials("testemail@email.com", "PerhapsPassword");
  await login.validateLoginTextError(
    login.loginError,
    "Invalid email or password",
  );
});
