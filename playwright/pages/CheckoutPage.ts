import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ShippingDetails } from "../fixtures";
import { OrderConfirmationPage } from "./OrderConfirmationPage";

export class CheckoutPage extends BasePage {
  readonly container: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly companyInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly countrySelect: Locator;
  readonly provinceInput: Locator;
  readonly billingSameAsShippingCheckbox: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitAddressButton: Locator;

  // Delivery
  readonly shippingAddressSummary: Locator;
  readonly shippingContactSummary: Locator;
  readonly billingAddressSummary: Locator;
  readonly editAddressButton: Locator;
  readonly deliveryOptionsContainer: Locator;
  readonly deliveryOptionRadios: Locator;
  readonly submitDeliveryOptionButton: Locator;
  readonly cartSubtotal: Locator;
  readonly cartShipping: Locator;
  readonly cartTaxes: Locator;
  readonly cartTotal: Locator;

  // Payment
  readonly submitPaymentButton: Locator;

  // Review
  readonly submitOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.container = this.page.getByTestId("checkout-container");
    this.firstNameInput = this.page.getByTestId("shipping-first-name-input");
    this.lastNameInput = this.page.getByTestId("shipping-last-name-input");
    this.addressInput = this.page.getByTestId("shipping-address-input");
    this.companyInput = this.page.getByTestId("shipping-company-input");
    this.postalCodeInput = this.page.getByTestId("shipping-postal-code-input");
    this.cityInput = this.page.getByTestId("shipping-city-input");
    this.countrySelect = this.page.getByTestId("shipping-country-select");
    this.provinceInput = this.page.getByTestId("shipping-province-input");
    this.billingSameAsShippingCheckbox = this.page.getByTestId(
      "billing-address-checkbox",
    );
    this.emailInput = this.page.getByTestId("shipping-email-input");
    this.phoneInput = this.page.getByTestId("shipping-phone-input");
    this.submitAddressButton = this.page.getByTestId("submit-address-button");

    this.shippingAddressSummary = this.page.getByTestId(
      "shipping-address-summary",
    );
    this.shippingContactSummary = this.page.getByTestId(
      "shipping-contact-summary",
    );
    this.billingAddressSummary = this.page.getByTestId(
      "billing-address-summary",
    );
    this.editAddressButton = this.page.getByTestId("edit-address-button");
    this.deliveryOptionsContainer = this.page.getByTestId(
      "delivery-options-container",
    );
    this.deliveryOptionRadios = this.page.getByTestId("delivery-option-radio");
    this.submitDeliveryOptionButton = this.page.getByTestId(
      "submit-delivery-option-button",
    );
    this.cartSubtotal = this.page.getByTestId("cart-subtotal");
    this.cartShipping = this.page.getByTestId("cart-shipping");
    this.cartTaxes = this.page.getByTestId("cart-taxes");
    this.cartTotal = this.page.getByTestId("cart-total");

    this.submitPaymentButton = this.page.getByTestId("submit-payment-button");

    this.submitOrderButton = this.page.getByTestId("submit-order-button");
  }

  async fillShippingAddress(details: ShippingDetails) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    if (details.company) {
      await this.companyInput.fill(details.company);
    }
    await this.postalCodeInput.fill(details.postalCode);
    await this.cityInput.fill(details.city);
    await this.countrySelect.selectOption({ label: details.country });
    if (details.state) {
      await this.provinceInput.fill(details.state);
    }
    await this.emailInput.fill(details.email);
    if (details.phone) {
      await this.phoneInput.fill(details.phone);
    }
  }

  async continueToDelivery() {
    await this.submitAddressButton.click();
  }

  async fillShippingAddressAndContinue(details: ShippingDetails) {
    await this.fillShippingAddress(details);
    await this.continueToDelivery();
  }

  deliveryOption(name: string) {
    return this.deliveryOptionRadios.filter({ hasText: name });
  }

  async selectDeliveryMethod(name: string) {
    await this.deliveryOption(name).click();
  }

  async continueToPayment() {
    await this.submitDeliveryOptionButton.click();
  }

  async selectDeliveryMethodAndContinue(name: string) {
    await this.selectDeliveryMethod(name);
    await this.continueToPayment();
  }

  paymentOption(name: string) {
    return this.page.getByRole("radio", { name });
  }

  async selectPaymentMethod(name: string) {
    await this.paymentOption(name).click();
  }

  async continueToReview() {
    await this.submitPaymentButton.click();
  }

  async selectPaymentMethodAndContinue(name: string) {
    await this.selectPaymentMethod(name);
    await this.continueToReview();
  }

  async placeOrder() {
    await this.submitOrderButton.click();
    return new OrderConfirmationPage(this.page);
  }
}
