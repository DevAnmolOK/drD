/** @format */

import { apiFetch } from '../api/fetcher';

export const FranchisePageEndPoints = {
	franchisePage: () => {
		return apiFetch({
			endpoint: '/page/pcd-pharma-franchise',
			cache: 'dynamic',
		});
	},
};
