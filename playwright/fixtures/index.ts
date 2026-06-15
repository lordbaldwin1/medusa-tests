import { HomePage } from "../pages/HomePage"
import { test as base, expect } from "@playwright/test";
import { Users } from "./users";
import { AccountPage } from "../pages/AccountPage";

type Fixtures = {
  homePage: HomePage;
  accountPage: AccountPage;
  users: Users;
}

const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  users: async ({ page }, use) => {
    const users = new Users(page);
    await use(users);
    await users.deleteAll();
  }
});

export { test, expect };