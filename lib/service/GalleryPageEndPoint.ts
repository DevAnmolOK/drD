
/** @format */

import { apiFetch } from "../api/fetcher";

// // api/v1/page/galleries

export const GalleryPageEndPoints = {
  gallery: () => {
    return apiFetch({
      endpoint: "page/galleries",
      cache: "dynamic",
    });
  },
};
