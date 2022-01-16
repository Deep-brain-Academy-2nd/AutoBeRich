import API from '.';
import axios from 'axios'
const loginAPI = {
  login: async (obj: any) => {
    await axios.post('http://localhost:5000/users/login', {
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
