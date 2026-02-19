import { apiFetch } from "../api/fetcher";

export const ProductApiEndPoints = {
  getAllProducts: () => {
    return apiFetch({
      endpoint: "page/gallery/hero",
      cache: "dynamic",
    });
  },

  productDatils: (slug?: string) => {
    return apiFetch({
      endpoint: "page/gallery/gallery",
      cache: "dynamic",
    });
  },

  //api/v1/page/products
  productBanner: () => {
    return apiFetch({
      endpoint: "page/products",
      cache: "dynamic",
    });
  },

  productConcern: () => {
    return apiFetch({
      endpoint: "page/concern",
      cache: "dynamic",
    });
  },

  productForm: () => {
    return apiFetch({
      endpoint: "/page/product-form",
      cache: "dynamic",
    });
  },

  productCategory: () => {
    return apiFetch({
      endpoint: "page/categories",
      cache: "dynamic",
    });
  },
};
