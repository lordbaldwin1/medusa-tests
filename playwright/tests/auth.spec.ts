import { AdminApi } from "../api-clients/AdminApi";
import { expect, test } from "../fixtures";

test.describe("testing auth", () => {
  test("auth", async ({ users, accountPage }) => {
    const user = await users.create();
    await user.apiLogin();
    await accountPage.navigate();
    await expect(accountPage.customerEmail).toContainText(user.email);
  });

  test("admin auth", async ({ request }) => {
  });
});
