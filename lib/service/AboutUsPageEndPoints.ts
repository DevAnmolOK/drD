/** @format */

import { apiFetch } from "../api/fetcher";

// api/v1/page/about-us
export const AboutPageEndPoints = {
  companyProfile: () => {
    return apiFetch({
      endpoint: "page/about-us",
      cache: "dynamic",
    });
  },
  
};
