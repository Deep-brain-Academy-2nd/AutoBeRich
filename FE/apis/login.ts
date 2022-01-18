import API from '.';

type Data = {
  email: string;
  password: string;
};

const loginAPI = {
  login: async (obj: Data) => {
    await API.post('users/login', obj)
      .then((res: any) => {
        return res
          .status(200)
          .json({ email: res.email, password: res.password });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default loginAPI;
