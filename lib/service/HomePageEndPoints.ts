/** @format */

import { apiFetch, apiPost } from "../api/fetcher";

export const HomePageEndPoints = {
  heroBanner: () => {
    return apiFetch({
      endpoint: "section/homepage-hero-section",
      cache: "dynamic",
    });
  },

  whoWeAre: () => {
    return apiFetch({
      endpoint: "section/homepage-who-we-are",
      cache: "dynamic",
    });
  },

  faqs: () => {
    return apiFetch({
      endpoint: "section/hompage-faqs",
      cache: "dynamic",
    });
  },

  calculatorSection: () => {
    return apiFetch({
      endpoint: "section/homepage-calculator-section",
      cache: "dynamic",
    });
  },

  customerReviews: () => {
    return apiFetch({
      endpoint: "section/homepage-customer-reviews",
      cache: "dynamic",
    });
  },

  trustedPharma: () => {
    return apiFetch({
      endpoint: "section/homepage-trusted-pharma",
      cache: "dynamic",
    });
  },

  homePageBlogs: () => {
    return apiFetch({
      endpoint: "section/homepage-blogs",
      cache: "dynamic",
    });
  },

  divisions: () => {
    return apiFetch({
      endpoint: "section/homepage-divisions",
      cache: "dynamic",
    });
  },
  // /api/v1/section/homepage-why-choose-us
  whyChooseUs: () => {
    return apiFetch({
      endpoint: "section/homepage-why-choose-us",
      cache: "dynamic",
    });
  },

  // /api/v1/section/homepage-promotional-input
  promotionalInput: () => {
    return apiFetch({
      endpoint: "section/homepage-promotional-input",
      cache: "dynamic",
    });
  },
};
