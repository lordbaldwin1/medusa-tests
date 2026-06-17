import { expect, test } from "../fixtures";


test.describe("checkout e2e", () => {
  test("guest checkout", async ({ storePage, checkoutData }) => {
    await storePage.navigate();
    const productDetailPage = await storePage.selectProduct(checkoutData.productName);
    await expect(productDetailPage.productTitle).toHaveText(checkoutData.productName);
    await expect(productDetailPage.productDescription).toHaveText(checkoutData.productDescription);
  })
})