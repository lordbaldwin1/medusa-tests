import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "./Navbar";

export class ProductDetailPage extends BasePage {
  readonly navbar: Navbar;
  readonly productContainer: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productOptions: Locator;
  readonly addProductButton: Locator;

  readonly mobileProductOptionsButton: Locator;
  readonly mobileProductOptionsModal: Locator;
  readonly mobileAddProductButton: Locator;
  readonly mobileCloseModalButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(this.page);
    this.productContainer = this.page.getByTestId("product-container");
    this.productTitle = this.productContainer.getByTestId("product-title");
    this.productDescription = this.productContainer.getByTestId(
      "product-description",
    );
    this.productPrice = this.productContainer.getByTestId("product-price");
    this.productOptions = this.productContainer.getByTestId("product-options");
    this.addProductButton =
      this.productContainer.getByTestId("add-product-button");

    this.mobileProductOptionsButton = this.productContainer.getByTestId(
      "mobile-actions-button",
    );
    this.mobileProductOptionsModal = this.page.getByTestId(
      "mobile-actions-modal",
    );
    this.mobileAddProductButton = this.page.getByTestId("mobile-cart-button");
    this.mobileCloseModalButton = this.page.getByTestId("close-modal-button");
  }

  async widescreenSelectProductVariant(variant: string) {
    const variantButton = this.productOptions.getByRole("button", {
      name: variant,
      exact: true,
    });
    await variantButton.click();
    await expect(this.addProductButton).toBeEnabled();
  }

  async mobileSelectProductVariant(variant: string) {
    await this.mobileOpenProductOptionsModal();
    const variantButton = this.mobileProductOptionsModal.getByRole("button", {
      name: variant,
      exact: true,
    });
    await variantButton.click();
    await this.mobileCloseModal();
    await expect(this.mobileAddProductButton).toBeEnabled();
  }

  async selectProductVariant(variant: string) {
    if (this.isMobile()) {
      await this.mobileSelectProductVariant(variant);
    } else {
      await this.widescreenSelectProductVariant(variant);
    }
  }

  async mobileOpenProductOptionsModal() {
    await this.mobileProductOptionsButton.click();
    await expect(this.mobileProductOptionsModal).toBeVisible();
  }

  async mobileCloseModal() {
    await this.mobileCloseModalButton.click();
    await expect(this.mobileProductOptionsModal).not.toBeVisible();
  }

  async addToCart() {
    if (this.isMobile()) {
      await this.mobileAddProductButton.click();
      await expect(this.mobileAddProductButton).not.toContainText("Loading");
    } else {
      await this.addProductButton.click();
      await expect(this.addProductButton).not.toContainText("Loading");
    }
  }
}
