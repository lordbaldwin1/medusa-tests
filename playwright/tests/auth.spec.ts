import { randomUUID } from "crypto";
import { CustomerApi } from "../api-clients/CustomerApi";
import { test } from "../fixtures";
import { config } from "../config";

test.describe("testing auth", () => {
  test("auth", async ({ request }) => {
    const api = new CustomerApi(request);
    const email = `test-${randomUUID()}@gmail.com`
    const token = await api.registerCustomerCredentials(email, config.DEFAULT_CUSTOMER_PASSWORD);
    const customer = await api.createCustomer(email, token);
    const loginToken = await api.createCustomerToken(email, config.DEFAULT_CUSTOMER_PASSWORD);
  });
});
