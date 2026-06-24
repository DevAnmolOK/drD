import { apiFetch } from "../api/fetcher";

export const AboutPageEndPoints = {
  companyProfile: () => {
    return apiFetch({
      endpoint: "page/about-us",
      cache: "dynamic",
    });
  },
};

export const RedirectionData = {
  getRedirection: () => {
    return apiFetch({
      endpoint: `url-redirector`,
      cache: "no-store",
    });
  },
};