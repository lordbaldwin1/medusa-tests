// we want an api where we can supply a users fixtures
// users -> users.create(); returns user
// users -> users.deleteAll(); deletes all users
// users needs to track all created users

import { randomUUID } from "crypto";
import { config } from "../config";
import { Page } from "@playwright/test";
import { CustomerApi } from "../api-clients/CustomerApi";
import { AdminApi } from "../api-clients/AdminApi";

// user -> user.apiLogin();

export class User {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  private page: Page;
  private customerApi: CustomerApi;

  constructor(
    id: string,
    email: string,
    password: string,
    page: Page,
    customerApi: CustomerApi,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.page = page;
    this.customerApi = customerApi;
  }

  async apiLogin() {
    const jwtToken = await this.customerApi.createCustomerToken(
      this.email,
      this.password,
    );
    await this.customerApi.createSessionForPage(this.page, jwtToken);
    await this.page.context().addCookies([
      {
        name: "_medusa_jwt",
        value: jwtToken,
        url: config.BASE_URL,
      },
    ]);
  }
}

export class Users {
  private created: User[];
  private page: Page;

  constructor(page: Page) {
    this.created = [];
    this.page = page;
  }

  async create(overrides?: { email?: string; password?: string }) {
    const email = overrides?.email ?? `test-${randomUUID()}@gmail.com`;
    const password = overrides?.password ?? config.DEFAULT_CUSTOMER_PASSWORD;
    const customerApi = new CustomerApi(this.page.request);

    const token = await customerApi.registerCustomerCredentials(
      email,
      password,
    );
    const { id } = await customerApi.createCustomer(email, token);

    const user = new User(id, email, password, this.page, customerApi);
    this.created.push(user);
    return user;
  }

  async deleteAll() {
    const adminApi = new AdminApi(this.page.request);
    for (const user of this.created) {
      await adminApi.deleteCustomer(user.id);
    }
  }
}
