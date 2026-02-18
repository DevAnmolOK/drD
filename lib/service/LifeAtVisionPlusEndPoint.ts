/** @format */

import { apiFetch } from '../api/fetcher';

export const lifeAtVisionPlusEndPoints = {
	// /api/v1/page/life-at-vision-plus
	lifeAtVisionPlus: () => {
		return apiFetch({
			endpoint: 'page/life-at-vision-plus',
			cache: 'dynamic',
		});
	},
};
