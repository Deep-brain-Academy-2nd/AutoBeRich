import API from '.';
import axios from 'axios';
const registerAPI = {
  register: (obj: any) => {
    const port = process.env.REACT_APP_API_URL;
    console.log(port, obj, API, 'api');
    axios
      .post('http://172.34.21.34:5000/users/signup', {
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
