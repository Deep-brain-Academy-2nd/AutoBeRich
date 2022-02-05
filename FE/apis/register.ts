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
			const result = await API.post('users/signup', obj).then((res: any) => {
				return res.data;
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	},
};

export default registerAPI;
