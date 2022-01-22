import React from 'react';
import Styled from 'styled-components';

const MyAccountWrap = Styled.div`
    width: 30%;
    height: 40%;
    background-color: white;
    border-radius: 5%;
`;

const MyAccount = ({ userInfo }) => {
  return (
    <MyAccountWrap>
      <ul>
        <li>보유원화</li>
        <li>평가금액</li>
        <li>선택 전략</li>
        <li>수익률</li>
        <li>보유 코인</li>
        <li>보유 수량</li>
        <li>매수금액</li>
        <li>매수 평균가</li>
      </ul>
    </MyAccountWrap>
  );
};

export default MyAccount;
