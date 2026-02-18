/** @format */

import { apiFetch, apiPost } from '../api/fetcher';

export const ContactUsEndPoints = {
	// /api/v1/page/contact-us
	contactUsPage: () => {
		return apiFetch({
			endpoint: 'page/contact-us',
			cache: 'dynamic',
		});
	},
};
