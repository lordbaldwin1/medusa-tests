import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class Navbar extends BasePage {
  readonly menuButton: Locator;
  readonly navMenuPopup: Locator;

  readonly navStoreLink: Locator;
  readonly navAccountLink: Locator;
  readonly navCartLink: Locator;

  readonly popupHomeLink: Locator;
  readonly popupStoreLink: Locator;
  readonly popupAccountLink: Locator;
  readonly popupCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = this.page.getByTestId("nav-menu-button");
    this.navMenuPopup = this.page.getByTestId("nav-menu-popup");

    this.navStoreLink = this.page.getByTestId("nav-store-link");
    this.navCartLink = this.page.getByTestId("nav-cart-link");
    this.navAccountLink = this.page.getByTestId("nav-account-link");

    this.popupHomeLink = this.page.getByTestId("home-link");
    this.popupStoreLink = this.page.getByTestId("store-link");
    this.popupAccountLink = this.page.getByTestId("account-link");
    this.popupCartLink = this.page.getByTestId("cart-link");

  }

  async openNavMenu() {
    await this.menuButton.click();
    await expect(this.navMenuPopup).toBeVisible();
  }

  async gotoAccount() {
    if (this.isMobile()) {
      this.openNavMenu();
      await this.popupAccountLink.click();
    } else {
      await this.navAccountLink.click();
    }
    // TODO: return account page object
  }
}