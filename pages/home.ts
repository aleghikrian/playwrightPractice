import { Page } from "playwright";

export class HomePage {
  page: Page;
  searchTextbox;
  searchButton;
  deleteSearchButton;

  constructor(page: any) {
    this.page = page;
    this.searchTextbox = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.deleteSearchButton = page.locator('[data-test="search-reset"]');
  }

  async search(search) {
    await this.searchTextbox.fill(search);
    await this.searchButton.click();
  }
}
