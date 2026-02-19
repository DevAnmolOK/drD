/** @format */

import { apiFetch } from "../api/fetcher";

export const AboutPageEndPoints = {
  companyProfile: () => {
    return apiFetch({
      endpoint: "page/company-profile",
      cache: "dynamic",
    });
  },
};
