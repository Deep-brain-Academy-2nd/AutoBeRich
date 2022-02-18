import { AxiosResponse } from 'axios';
import API from '.';

type Data = {
	email: string;
	password: string;
	name: string;
	accessKey: string;
	secretKey: string;
};

const registerAPI = {
	register: async (obj: Data) => {
		try {
			const result = await API.post('users/signup', obj).then((res: AxiosResponse) => {
				return res.data;
			});
			return result;
		} catch (error) {
			// console.error(error);
			new Error('Failure Register');
		}
	},
};

export default registerAPI;
