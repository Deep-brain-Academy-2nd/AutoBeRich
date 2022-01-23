import React, { useEffect, useState } from 'react';

import API from '../../apis';
import MyAccount from './MyAccount';

const MyAccountContainer = () => {
  const [userInfo, setUserInfo] = useState('');
  const [krwInfo, setKrwInfo] = useState('');
  const [strategy, setStrategy] = useState('');
  useEffect(() => {
    getAccountInfos();
  }, []);
  const getAccountInfos = async () => {
    try {
      const email = localStorage.getItem('email');
      const res = await API.get('/trading/getUserInfo', {
        params: {
          email,
        },
      });
      if (res.data.code === 200) {
        setUserInfo(res.data.coinInfo);
        setKrwInfo(res.data.upbit_accounts);
        setStrategy(res.data.strategy);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MyAccount userInfo={userInfo} krwInfo={krwInfo} strategy={strategy} />
  );
};

export default MyAccountContainer;
