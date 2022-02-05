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
			}).then((res) => {
				return res.data;
			});

			return result;
		} catch (error) {
			console.error(error);
		}
	},
	updateTradingStrategy: async (param: updateTradingApiResType) => {
		try {
			const result = await API.put('/trading/updateTradingStrategy', param).then((res) => {
				return res.data;
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	updateStatusAutoTraiding: async (req: { status: boolean; email: string | null }) => {
		try {
			const result = await API.post('/trading/updateStatusAutoTraiding', req);
			return result.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export default tradingAPI;
