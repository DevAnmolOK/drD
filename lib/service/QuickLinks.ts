import { apiFetch } from "../api/fetcher";

export const QuickLinksPageEndPoints = {
  getPromotionBanner: () => {
    return apiFetch({
      endpoint: "page/promotions",
      cache: "dynamic",
    });
  },

  getCommingSoonBanner: () => {
    return apiFetch({
      endpoint: "page/coming-soon",
      cache: "dynamic",
    });
  },

  getNewLaunchBanner: () => {
    return apiFetch({
      endpoint: "page/new-launched",
      cache: "dynamic",
    });
  },

  getOfferPageBanner: () => {
    return apiFetch({
      endpoint: "page/offers",
      cache: "dynamic",
    });
  },

  getCertificateBanner: () => {
    return apiFetch({
      endpoint: "page/offers",
      cache: "dynamic",
    });
  },
};
