import { apiFetch } from "../api/fetcher";

export const VisualsAddsPageEndPoints = {
  getVisualAdds: () => {
    return apiFetch({
      endpoint: "page/visual-ads",
      cache: "dynamic",
    });
  },
};
