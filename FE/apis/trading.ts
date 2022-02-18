import { AxiosResponse } from 'axios';
import API from '.';

export interface updateTradingApiResType {
	email: null | string;
	strategy: null | string;
}

const tradingAPI = {
	getAccountInfos: async (email: string | null) => {
		try {
			const result = await API.get('/trading/getUserInfo', {
				params: {
					email,
				},
			}).then((res: AxiosResponse) => {
				return res.data;
			});

			return result;
		} catch (error) {
			new Error('Failure tradingAPI');
		}
	},
	updateTradingStrategy: async (param: updateTradingApiResType) => {
		try {
			const result = await API.put('/trading/updateTradingStrategy', param).then((res: AxiosResponse) => {
				return res.data;
			});
			return result;
		} catch (error) {
			new Error('Failure updateTradingStrategy');
		}
	},
	updateStatusAutoTraiding: async (req: { status: boolean; email: string | null }) => {
		try {
			const result = await API.post('/trading/updateStatusAutoTraiding', req);
			return result.data;
		} catch (error) {
			new Error('Failure updateStatusAutoTrading');
		}
	},
};

export default tradingAPI;
