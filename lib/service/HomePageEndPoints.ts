/** @format */

import { apiFetch, apiPost } from "../api/fetcher";

export const HomePageEndPoints = {

  homeBannerSection: () => {
    return apiFetch({
      endpoint: "section/home-banner-section",
      cache: "dynamic",
    });
  },

  homeAbout: () => {
    return apiFetch({
      endpoint: "section/home-about",
      cache: "dynamic",
    });
  },

  homeDirectorData: () => {
    return apiFetch({
      endpoint: "section/home-director-data",
      cache: "dynamic",
    });
  },  


  homeTrustedBy: () => {
    return apiFetch({
      endpoint: "section/home-trusted-by",
      cache: "dynamic",
    });
  },

  homeCategories: () => {
    return apiFetch({
      endpoint: "section/home-categories",
      cache: "dynamic",
    });
  },

  homeProductRange: () => {
    return apiFetch({
      endpoint: "section/home-product-range",
      cache: "dynamic",
    });
  },
  
  homeLifeEasy: () => {
    return apiFetch({
      endpoint: "section/home-life-easy",
      cache: "dynamic",
    });
  },
 
  homeManufacturingPartners: () => {
    return apiFetch({
      endpoint: "section/home-manufacturing-partners",
      cache: "dynamic",
    });
  },

  homeChooseUs: () => { 
    return apiFetch({
      endpoint: "section/home-choose-us",
      cache: "dynamic",
    });
  } ,

  homeBlogs: () => {
    return apiFetch({
      endpoint: "section/home-blogs",
      cache: "dynamic",
    });
  },

  homeTestimonials: () => {
    return apiFetch({
      endpoint: "section/home-testimonials",
      cache: "dynamic",
    });
  } ,

  homeOurStrengths: () => {
    return apiFetch({
      endpoint: "section/home-our-strengths",
      cache: "dynamic",
    });
  },

  homeGlobalFootprint: () => {
    return apiFetch({
      endpoint: "section/home-global-footprint",
      cache: "dynamic",
    });
  },

  // /api/v1/section/home-product-listing
  homeProductListing: () => {
    return apiFetch({
      endpoint: "section/home-product-listing",
      cache: "dynamic",
    });
  }
};
