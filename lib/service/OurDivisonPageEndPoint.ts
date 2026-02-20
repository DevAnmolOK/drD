
/** @format */

import { apiFetch } from "../api/fetcher";

// api/v1/page/about-us
export const OurdivisonPageEndPoints = {

  // api/v1/page/our-divisions
    ourDivisions: () => {   
    return apiFetch({
      endpoint: "page/our-divisions",
      cache: "dynamic",
    });
  } 
};
