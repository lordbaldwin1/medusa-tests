import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "./Navbar";


export class HomePage extends BasePage {
  readonly navbar: Navbar;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(this.page);
  }

  async navigate() {
    await this.goto();
  }
}