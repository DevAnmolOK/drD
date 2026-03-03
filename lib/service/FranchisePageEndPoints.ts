/** @format */

import { apiFetch } from "../api/fetcher";

export const FranchisePageEndPoints = {
  // /api/v1/page/pharma-franchise
  franchisePage: () => {
    return apiFetch({
      endpoint: "page/pharma-franchise",
      cache: "dynamic",
    });
  },
};
