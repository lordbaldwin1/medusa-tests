import { test, expect } from "../fixtures";

test.describe("home page tests", () => {
  test("navbar is visible", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.navbar.navStoreLink).toBeVisible();
  });
});