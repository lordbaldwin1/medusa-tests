import { Page } from "@playwright/test";
import { config, localizedPath } from "../config";
import { Navbar } from "./Navbar";

export abstract class BasePage {
  protected readonly page: Page;
  readonly navbar: Navbar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(this.page);
  }

  async goto(path = "") {
    await this.page.goto(localizedPath(path));
  }

  isMobile() {
    const viewport = this.page.viewportSize();
    if (!viewport) {
      throw new Error("Viewport size is null in isMobile() call");
    }
    return viewport.width < config.MOBILE_VIEWPORT_BREAKPOINT;
  }
}