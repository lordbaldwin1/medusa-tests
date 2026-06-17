import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../config";

export class Navbar {
  private readonly page: Page;
  readonly menuButton: Locator;
  readonly navMenuPopup: Locator;

  readonly navStoreLink: Locator;
  readonly navAccountLink: Locator;
  readonly navCartLink: Locator;

  readonly popupHomeLink: Locator;
  readonly popupStoreLink: Locator;
  readonly popupAccountLink: Locator;
  readonly popupCartLink: Locator;

  readonly cartDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = this.page.getByTestId("nav-menu-button");
    this.navMenuPopup = this.page.getByTestId("nav-menu-popup");

    this.navStoreLink = this.page.getByTestId("nav-store-link");
    this.navCartLink = this.page.getByTestId("nav-cart-link");
    this.navAccountLink = this.page.getByTestId("nav-account-link");

    this.popupHomeLink = this.page.getByTestId("home-link");
    this.popupStoreLink = this.page.getByTestId("store-link");
    this.popupAccountLink = this.page.getByTestId("account-link");
    this.popupCartLink = this.page.getByTestId("cart-link");

    this.cartDropdown = this.page.getByTestId("nav-cart-dropdown");
  }

  async openNavMenu() {
    await this.menuButton.click();
    await expect(this.navMenuPopup).toBeVisible();
  }

  isMobile() {
    const viewport = this.page.viewportSize();
    if (!viewport) {
      throw new Error("Viewport size is null in isMobile() call");
    }
    return viewport.width < config.MOBILE_VIEWPORT_BREAKPOINT;
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

  async hoverCart() {
    await this.navCartLink.hover();
  }
}
