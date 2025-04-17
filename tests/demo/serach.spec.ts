import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { Base } from "../../pages/base";

test("Search Hammers", async ({ page }) => {
  const home = new HomePage(page);
  const base = new Base(page);

  await base.goToHomePage();
  await home.search("hammer");
});
