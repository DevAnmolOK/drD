/** @format */

import axios, { AxiosError } from "axios";
import https from "node:https";
import { API_CONFIG } from "./config";
import { publicMediaUrl } from "../publicMediaUrl";

const isBrowser = typeof window !== "undefined";
// SSR must use loopback: calling https://drdpharma.in from this server hits hairpin/NAT → ECONNRESET.
const serverBaseURL =
  !isBrowser && process.env.API_INTERNAL_URL
    ? process.env.API_INTERNAL_URL
    : process.env.NEXT_PUBLIC_API_URL!;
const insecureLocalHttps =
  !isBrowser &&
  serverBaseURL.startsWith("https://127.0.0.1");

function deepRewriteLoopbackUrls<T>(data: T): T {
  if (data === null || data === undefined) return data;
  if (typeof data === "string") {
    return publicMediaUrl(data) as T;
  }
  if (typeof data !== "object") return data;
  if (Array.isArray(data)) {
    return data.map((item) => deepRewriteLoopbackUrls(item)) as T;
  }
  const obj = data as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    out[key] = deepRewriteLoopbackUrls(obj[key]);
  }
  return out as T;
}

export const api = axios.create({
  baseURL: serverBaseURL,
  timeout: API_CONFIG.timeout,
  ...(insecureLocalHttps
    ? { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
    : {}),
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": API_CONFIG.apiKey,
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(" Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
	(response) => {
		if (response.data !== undefined) {
			response.data = deepRewriteLoopbackUrls(response.data);
		}
    console.log(` API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error(
        ` API Error: ${error.response.status} ${error.config?.url}`,
        error.response.data,
      );
    } else if (error.request) {
      console.error(" Network Error: No response received", error.message);
    } else {
      console.error(" Error:", error.message);
    }
    return Promise.reject(error);
  },
);
