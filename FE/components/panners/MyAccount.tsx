import React from 'react';
import Styled from 'styled-components';

const MyAccountWrap = Styled.div`
    width: 30%;
    height: 40%;
    background-color: white;
    border-radius: 5%;
`;

const MyAccount = (userInfo) => {
  console.log(userInfo);
  return <MyAccountWrap>MyAccountWrap</MyAccountWrap>;
};

export default MyAccount;
