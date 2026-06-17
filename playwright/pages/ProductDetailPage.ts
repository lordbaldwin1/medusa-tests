import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductDetailPage extends BasePage {
  readonly productContainer: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.productContainer = this.page.getByTestId("product-container");
    this.productTitle = this.productContainer.getByTestId("product-title");
    this.productDescription = this.productContainer.getByTestId("product-description");
  }
}