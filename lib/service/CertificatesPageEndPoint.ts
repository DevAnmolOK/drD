import { apiFetch } from "../api/fetcher";

export const CertificatePageEndPoints = {
  getCertificatePage: () => {
    return apiFetch({
      endpoint: "page/certificates",
      cache: "dynamic",
    });
  },
};
