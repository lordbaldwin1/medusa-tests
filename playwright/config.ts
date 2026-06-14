import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function envOrThrow(key: string, fallback?: string) {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`ENV variable: ${key} is required!`);
  }
  return value;
}

export const config = {
  BASE_URL: envOrThrow("PLAYWRIGHT_BASE_URL", "http://localhost:8000"),
  DEFAULT_COUNTRY_CODE: envOrThrow("PLAYWRIGHT_COUNTRY_CODE", "dk"),
  MOBILE_VIEWPORT_BREAKPOINT: 1024,
}

export function localizedPath(route = ""): string {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `/${config.DEFAULT_COUNTRY_CODE}${normalized === "/" ? "" : normalized}`;
}
