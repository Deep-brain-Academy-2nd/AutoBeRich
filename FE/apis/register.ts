import API from '.';

const registerAPI = {
  register: async (obj: any) => {
    await API.post('/register', {
      obj,
    })
      .then((res) => {
        console.log(res, 'API');
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default registerAPI;
