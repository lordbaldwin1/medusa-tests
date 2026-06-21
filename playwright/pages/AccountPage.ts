import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "./Navbar";

export class AccountPage extends BasePage {
  readonly navbar: Navbar;
  readonly customerEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(this.page);
    this.customerEmail = this.page.getByTestId("customer-email");
  }

  async navigate() {
    await this.goto("/account");
  }
}