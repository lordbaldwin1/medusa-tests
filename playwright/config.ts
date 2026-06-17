import "dotenv/config";

function envOrThrow(key: string, fallback?: string) {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`ENV variable: ${key} is required!`);
  }
  return value;
}

export const config = {
  BASE_URL: envOrThrow("PLAYWRIGHT_BASE_URL", "http://localhost:8000"),
  BACKEND_API_URL: envOrThrow("BACKEND_API_URL", "http://localhost:9000"),
  DEFAULT_COUNTRY_CODE: envOrThrow("PLAYWRIGHT_COUNTRY_CODE", "dk"),
  MOBILE_VIEWPORT_BREAKPOINT: 1024, // TODO: move to env?
  X_PUBLISHABLE_API_KEY: envOrThrow("X_PUBLISHABLE_API_KEY"),
  DEFAULT_CUSTOMER_PASSWORD: "testpassword", // TODO: move to env
  ADMIN_EMAIL: "admin@test.com",
  ADMIN_PASSWORD: "testpassword",
}

export function localizedPath(route = ""): string {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `/${config.DEFAULT_COUNTRY_CODE}${normalized === "/" ? "" : normalized}`;
}
