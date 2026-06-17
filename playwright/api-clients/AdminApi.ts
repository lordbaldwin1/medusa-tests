import { APIRequestContext, expect, request } from "@playwright/test";
import { config } from "../config";

export class AdminApi {
  private readonly request: APIRequestContext;
  private adminToken: string | undefined;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAdminToken() {
    if (this.adminToken) {
      return this.adminToken;
    }

    const response = await this.request.post(
      `${config.BACKEND_API_URL}/auth/user/emailpass`,
      {
        data: {
          email: config.ADMIN_EMAIL,
          password: config.ADMIN_PASSWORD,
        },
      },
    );
    expect(response.status()).toBe(200);
    const { token } = (await response.json()) as { token: string };
    this.adminToken = token;
    return token;
  }

  async deleteCustomer(customerId: string) {
    const token = await this.getAdminToken();
    const response = await this.request.delete(
      `${config.BACKEND_API_URL}/admin/customers/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    expect(response.status()).toBe(200);
  }
}
