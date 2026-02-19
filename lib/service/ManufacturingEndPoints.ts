import { apiFetch } from "../api/fetcher";

export const ManufacturingPageEndPoints = {
  // /api/v1/page/manufacturing-profile
  manufacturingPage: () => {
    return apiFetch({
      endpoint: "page/manufacturing-profile",
      cache: "dynamic",
    });
  },
}