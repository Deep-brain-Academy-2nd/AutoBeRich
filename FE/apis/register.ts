import type { NextApiRequest, NextApiResponse } from 'next';
import API from '.';

type Data = {
  email: string;
  password: string;
};

const registerAPI = {
  register: (obj: Data) => {
    API.post('users/signup', obj)
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

export default registerAPI;
