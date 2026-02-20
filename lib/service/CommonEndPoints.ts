/** @format */

import { apiFetch } from "../api/fetcher";

export const CommonEndPoints = {
  menu: () => {
    return apiFetch({
      endpoint: "menus",
      cache: "dynamic",
    });
  },

  footerMenu: () => {
    return apiFetch({
      endpoint: "footer-menu",
      cache: "dynamic",
    });
  },

  // /api/v1/page/privacy-policy
  privacyPolicy: () => {
    return apiFetch({
      endpoint: "page/privacy-policy",
      cache: "dynamic",
    });
  },

  // /api/v1/page/terms-conditions
  termsConditions: () => {
    return apiFetch({
      endpoint: "page/terms-conditions",
      cache: "dynamic",
    });
  },
};
