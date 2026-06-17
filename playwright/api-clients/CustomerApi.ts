import { APIRequestContext, expect, Page, request } from "@playwright/test";
import { config } from "../config";

type Address = {
  id: string;
  address_name: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  customer_id: string;
  company: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  country_code: string;
  province: string;
  postal_code: string;
  phone: string;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

type CreateCustomerResponse = {
  customer: {
    id: string;
    email: string;
    company_name: string | null;
    first_name: string;
    last_name: string;
    phone: string;
    metadata: Record<string, any> | null;
    has_account: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    addresses: Address[];
  };
};

export class CustomerApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerCustomerCredentials(email: string, password: string) {
    const response = await this.request.post(`${config.BACKEND_API_URL}/auth/customer/emailpass/register`, {
      data: {
        email,
        password,
      }
    });
    expect(response.status()).toBe(200);
    const { token } = await response.json() as { token: string };
    return token;
  }

  async createCustomer(email: string, token: string) {
    const authorizedRequest = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "x-publishable-api-key": config.X_PUBLISHABLE_API_KEY,
        "Content-Type": "application/json",
      }
    });

    const response = await authorizedRequest.post(`${config.BACKEND_API_URL}/store/customers`, {
      data: {
        email,
        first_name: "zargadoo",
        last_name: "zingabord",
        phone: "5038881123",
      }
    });
    expect(response.status()).toBe(200);
    const { customer } = (await response.json()) as CreateCustomerResponse;
    return customer;
  }

  async createCustomerToken(email: string, password: string) {
    const response = await this.request.post(`${config.BACKEND_API_URL}/auth/customer/emailpass`, {
      data: {
        email,
        password,
      }
    });
    expect(response.status()).toBe(200);
    const { token } = (await response.json()) as { token: string };
    return token;
  }

  // need to have helper for cookie session id
  async getSessionCookie(token: string) {
    const response = await this.request.post(`${config.BACKEND_API_URL}/auth/session`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
  }

  async createSessionForPage(page: Page, token: string) {
    const response = await page.request.post(`${config.BACKEND_API_URL}/auth/session`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    // console.log(await response.headers());
    // const connectSid = await response.headers()[]
  }
}