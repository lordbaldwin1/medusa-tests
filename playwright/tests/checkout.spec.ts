import { expect, test } from "../fixtures";

test.describe("checkout e2e", () => {
  test("guest checkout", async ({ storePage, checkoutData }) => {
    await storePage.navigate();

    const productDetailPage = await storePage.selectProduct(
      checkoutData.productName,
    );
    await expect(productDetailPage.productTitle).toHaveText(
      checkoutData.productName,
    );
    await expect(productDetailPage.productDescription).toHaveText(
      checkoutData.productDescription,
    );
    await expect(productDetailPage.productPrice).toContainText(
      checkoutData.basePrice,
    );

    await productDetailPage.selectProductVariant(checkoutData.variant);
    await productDetailPage.addToCart();

    const cartPage = await productDetailPage.navbar.gotoCart();
    const productRow = await cartPage.getProductRow(
      checkoutData.productName,
      checkoutData.variant,
    );
    await expect(productRow.unitPrice).toContainText(checkoutData.basePrice);
    await expect(productRow.totalPrice).toContainText(checkoutData.basePrice);
    await expect(cartPage.cartTotal).toHaveText(`€${checkoutData.basePrice}`);
    await expect(cartPage.cartShipping).toHaveText(`€0.00`);
    await expect(cartPage.cartTaxes).toHaveText(`€0.00`);

    const checkoutPage = await cartPage.checkout();
    const { shippingDetails } = checkoutData;
    await checkoutPage.fillShippingAddressAndContinue(shippingDetails);

    await expect(checkoutPage.shippingAddressSummary).toContainText(
      `${shippingDetails.firstName} ${shippingDetails.lastName}`,
    );
    await expect(checkoutPage.shippingAddressSummary).toContainText(
      shippingDetails.address,
    );
    await expect(checkoutPage.shippingAddressSummary).toContainText(
      `${shippingDetails.postalCode}, ${shippingDetails.city}`,
    );
    await expect(checkoutPage.shippingContactSummary).toContainText(
      shippingDetails.phone,
    );
    await expect(checkoutPage.shippingContactSummary).toContainText(
      shippingDetails.email,
    );
    await expect(checkoutPage.billingAddressSummary).toContainText(
      "Billing and delivery address are the same.",
    );

    await checkoutPage.selectDeliveryMethod(checkoutData.shippingMethod);
    await expect(checkoutPage.cartSubtotal).toHaveText(
      `€${checkoutData.basePrice}`,
    );
    await expect(checkoutPage.cartShipping).toHaveText(
      `€${checkoutData.shippingCost}`,
    );
    await expect(checkoutPage.cartTaxes).toHaveText(`€0.00`);
    await expect(checkoutPage.cartTotal).toHaveText(
      `€${checkoutData.totalCost}`,
    );

    await checkoutPage.continueToPayment();

    await checkoutPage.selectPaymentMethod(checkoutData.paymentMethod);
    await checkoutPage.continueToReview();

    const orderConfirmationPage = await checkoutPage.placeOrder();
    await expect(orderConfirmationPage.container).toBeVisible();
    await expect(orderConfirmationPage.orderEmail).toHaveText(
      shippingDetails.email,
    );
    await expect(orderConfirmationPage.orderDate).toHaveText(
      new Date().toDateString(),
    );
    await expect(orderConfirmationPage.orderId).toBeVisible();

    const orderProductRow = orderConfirmationPage.getProductRow(
      checkoutData.productName,
      checkoutData.variant,
    );
    await expect(orderProductRow.name).toHaveText(checkoutData.productName);
    await expect(orderProductRow.variant).toHaveText(
      `Variant: ${checkoutData.variant}`,
    );
    await expect(orderProductRow.quantity).toHaveText(
      String(checkoutData.quantity),
    );
    await expect(orderProductRow.unitPrice).toHaveText(
      `€${checkoutData.basePrice}`,
    );
    await expect(orderProductRow.totalPrice).toHaveText(
      `€${checkoutData.basePrice}`,
    );
    await expect(orderConfirmationPage.cartSubtotal).toHaveText(
      `€${checkoutData.basePrice}`,
    );
    await expect(orderConfirmationPage.cartShipping).toHaveText(
      `€${checkoutData.shippingCost}`,
    );
    await expect(orderConfirmationPage.cartTaxes).toHaveText(`€0.00`);
    await expect(orderConfirmationPage.cartTotal).toHaveText(
      `€${checkoutData.totalCost}`,
    );

    await expect(orderConfirmationPage.shippingAddressSummary).toContainText(
      `${shippingDetails.firstName} ${shippingDetails.lastName}`,
    );
    await expect(orderConfirmationPage.shippingAddressSummary).toContainText(
      shippingDetails.address,
    );
    await expect(orderConfirmationPage.shippingAddressSummary).toContainText(
      `${shippingDetails.postalCode}, ${shippingDetails.city}`,
    );
    await expect(orderConfirmationPage.shippingContactSummary).toContainText(
      shippingDetails.phone,
    );
    await expect(orderConfirmationPage.shippingContactSummary).toContainText(
      shippingDetails.email,
    );
    await expect(orderConfirmationPage.shippingMethodSummary).toContainText(
      `${checkoutData.shippingMethod} (€${checkoutData.shippingCost})`,
    );

    await expect(orderConfirmationPage.paymentMethod).toHaveText(
      checkoutData.paymentMethod,
    );
    await expect(orderConfirmationPage.paymentAmount).toContainText(
      `€${checkoutData.totalCost}`,
    );
  });
});
