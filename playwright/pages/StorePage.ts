import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductDetailPage } from "./ProductDetailPage";


export class StorePage extends BasePage {
  readonly productsList: Locator;
  readonly productWrappers: Locator;

  constructor(page: Page) {
    super(page);
    this.productsList = this.page.getByTestId("products-list");
    this.productWrappers = this.page.getByTestId("product-wrapper");
  }

  async navigate() {
    await this.goto("/store");
    await expect(this.productsList).toBeVisible();
  }

  async selectProduct(productName: string) {
    await this.productWrappers.filter({ hasText: productName }).click();
    const productDetailPage = new ProductDetailPage(this.page);
    await expect(productDetailPage.productContainer).toBeVisible();
    return productDetailPage;
  }
}