import { HomePage } from "../pages/HomePage";
import { test as base, expect } from "@playwright/test";
import { Users } from "./users";
import { AccountPage } from "../pages/AccountPage";
import { StorePage } from "../pages/StorePage";
import { readFile } from "fs/promises";

type CheckoutData = {
  productName: string;
  productDescription: string;
  variant: string;
  weight: string;
  basePrice: string;
  shippingMethod: string;
  shippingCost: string;
  quantity: number;
  promotionCode: string;
  promotionAmount: string;
  totalCost: string;
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    company: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  };
};

type Fixtures = {
  homePage: HomePage;
  storePage: StorePage;
  accountPage: AccountPage;
  users: Users;
};

type WorkerFixtures = {
  checkoutData: CheckoutData;
};

const test = base.extend<Fixtures, WorkerFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  storePage: async ({ page }, use) => {
    await use(new StorePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  users: async ({ page }, use) => {
    const users = new Users(page);
    await use(users);
    await users.deleteAll();
  },
  checkoutData: [
    async ({}, use) => {
      try {
        const data = await readFile(`./playwright/data/test-data.json`, "utf-8");
        const { checkoutData } = JSON.parse(data) as { checkoutData: CheckoutData };
        await use(checkoutData);
      } catch (error) {
        console.error(`Failed to read or parse test-data.json: ${error.message}`)
      }
    },
    { scope: "worker" },
  ],
});

export { test, expect };
