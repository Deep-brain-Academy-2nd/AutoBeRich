import API from '.';

type Data = {
  email: string;
  password: string;
};
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const loginAPI = {
  login: async (obj: Data) => {
    await API.post('users/login', obj)
      .then((res: any) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // onLogin: ({ email, password }: Data) => {
  //   const data = {
  //     email,
  //     password,
  //   };
  //   API.post('/login', data)
  //     .then(onLoginSuccess)
  //     .catch((error) => {
  //       // ... 에러 처리
  //     });
  // },

  // onSilentRefresh: () => {
  //   API.post('/silent-refresh', data)
  //     .then(onLoginSuccess)
  //     .catch((error) => {
  //       // ... 로그인 실패 처리
  //     });
  // },

  // onLoginSuccess: (response) => {
  //   const { accessToken } = response.data;

  //   // accessToken 설정
  //   API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  //   // accessToken 만료하기 1분 전에 로그인 연장
  //   setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
  // },
};

export default loginAPI;
