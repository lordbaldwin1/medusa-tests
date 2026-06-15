import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class AccountPage extends BasePage {
  readonly customerEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.customerEmail = this.page.getByTestId("customer-email");
  }

  async navigate() {
    await this.goto("/account");
  }
}