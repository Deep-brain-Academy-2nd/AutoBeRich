import React, { useEffect, useState } from 'react';

import API from '../../apis';
import MyAccount from './MyAccount';

const MyAccountContainer = () => {
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    // getAccountInfos();
  }, []);
  const getAccountInfos = async () => {
    const res = await API.get('/account/info');
    console.log(res, 'getAccountInfo');
    setUserInfo(res.data);
  };
  return <MyAccount userInfo={userInfo} />;
};

export default MyAccountContainer;
