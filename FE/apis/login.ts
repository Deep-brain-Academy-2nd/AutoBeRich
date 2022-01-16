import API from '.';

const loginAPI = {
  login: async (obj: any) => {
    await API.post('users/login', {
      obj,
    })
      .then((res) => {
        console.log(res, 'loginAPI');
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default loginAPI;
