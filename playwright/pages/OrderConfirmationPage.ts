import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderConfirmationPage extends BasePage {
  readonly container: Locator;
  readonly orderEmail: Locator;
  readonly orderDate: Locator;
  readonly orderId: Locator;

  // Summary
  readonly productRows: Locator;
  readonly cartSubtotal: Locator;
  readonly cartShipping: Locator;
  readonly cartTaxes: Locator;
  readonly cartTotal: Locator;

  // Delivery
  readonly shippingAddressSummary: Locator;
  readonly shippingContactSummary: Locator;
  readonly shippingMethodSummary: Locator;

  // Payment
  readonly paymentMethod: Locator;
  readonly paymentAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("order-complete-container");
    this.orderEmail = this.page.getByTestId("order-email");
    this.orderDate = this.page.getByTestId("order-date");
    this.orderId = this.page.getByTestId("order-id");

    this.productRows = this.page.getByTestId("product-row");
    this.cartSubtotal = this.page.getByTestId("cart-subtotal");
    this.cartShipping = this.page.getByTestId("cart-shipping");
    this.cartTaxes = this.page.getByTestId("cart-taxes");
    this.cartTotal = this.page.getByTestId("cart-total");

    this.shippingAddressSummary = this.page.getByTestId(
      "shipping-address-summary",
    );
    this.shippingContactSummary = this.page.getByTestId(
      "shipping-contact-summary",
    );
    this.shippingMethodSummary = this.page.getByTestId(
      "shipping-method-summary",
    );

    this.paymentMethod = this.page.getByTestId("payment-method");
    this.paymentAmount = this.page.getByTestId("payment-amount");
  }

  getProductRow(productName: string, variant: string) {
    const row = this.productRows
      .filter({ hasText: productName })
      .filter({ hasText: `Variant: ${variant}` });
    return {
      name: row.getByTestId("product-name"),
      variant: row.getByTestId("product-variant"),
      quantity: row.getByTestId("product-quantity"),
      unitPrice: row.getByTestId("product-unit-price"),
      totalPrice: row.getByTestId("product-price"),
    };
  }
}
