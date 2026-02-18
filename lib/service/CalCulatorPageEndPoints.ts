import { apiFetch } from "../api/fetcher";

export const CalCulatorPageEndPoints = {
  	calculationPage: () => {
		return apiFetch({
			endpoint: 'page/ptr-pts-calculator-profile',
			cache: 'dynamic',
		});
	},

	calculatorProfile: () => {
		return apiFetch({
			endpoint: 'page/calculator-profile',
			cache: 'dynamic',
		});	
	},

}