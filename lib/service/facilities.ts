import { apiFetch } from "../api/fetcher";

export const facilitiesPageEndPoints = {
  getData: () => {
    return apiFetch({
      endpoint: "page/facilities",
      cache: "dynamic",
    });
  },
};
