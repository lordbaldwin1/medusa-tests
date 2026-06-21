import { Page } from "@playwright/test";
import { config, localizedPath } from "../config";

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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