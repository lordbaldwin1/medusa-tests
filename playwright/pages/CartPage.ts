import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "./Navbar";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage extends BasePage {
  readonly navbar: Navbar;
  readonly header: Locator;
  readonly table: Locator;
  readonly productRows: Locator;
  readonly cartTotal: Locator;
  readonly cartShipping: Locator;
  readonly cartTaxes: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(this.page);
    this.header = this.page.getByRole("heading", { level: 2, name: "Cart" });
    this.table = this.page.getByRole("table");
    this.productRows = this.page.getByTestId("product-row");
    this.cartTotal = this.page.getByTestId("cart-total");
    this.cartShipping = this.page.getByTestId("cart-shipping");
    this.cartTaxes = this.page.getByTestId("cart-taxes");
    this.checkoutButton = this.page.getByTestId("checkout-button");
  }

  async getProductRow(productName: string, variant: string) {
    const row = this.productRows
      .filter({ hasText: productName })
      .filter({ hasText: `Variant: ${variant}` });
    return {
      unitPrice: row.getByTestId("product-unit-price"),
      totalPrice: row.getByTestId("product-price"),
    };
  }

  async checkout() {
    await this.checkoutButton.click();
    const checkoutPage = new CheckoutPage(this.page);
    return checkoutPage;
  }
}
