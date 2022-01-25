import React from 'react';
import Styled from 'styled-components';

const MyAccountWrap = Styled.div`
    width: 30%;
    height: 40%;
    background-color: white;
    border-radius: 5%;
    size: 1rem;
    overflow: scroll;
`;

const MyAccount = ({
  userInfo,
  krwInfo,
  strategy,
}: {
  userInfo: any;
  krwInfo: any;
  strategy: any;
}) => {
  return (
    <MyAccountWrap>
      {userInfo ? (
        <ul>
          <li>보유원화 : {parseInt(krwInfo && krwInfo[0].balance)} 원</li>
          <li>총 매수금액 : {parseInt(userInfo.totalMoney)} 원</li>
          <li>
            선택 전략 : {strategy === 'Changing_Trading' ? '변동성매매' : ''}
          </li>
          <br />
          {userInfo &&
            Object.values(userInfo.coinList).map((item: any, idx: number) => {
              return (
                <ul key={idx}>
                  <li>보유 코인 : {item.name}</li>
                  <li>보유 수량 : {item.quantity}</li>
                  <li>수익률 : {item.earningRate} %</li>
                  <li>매수 총액 : {parseInt(item.entryPrice)} 원</li>
                  <li>매수 평균가 : {parseInt(item.avgBuyPrice)} 원</li>
                  <li>현재 거래 금액 : {parseInt(item.trade_price)}</li>
                  <li>현재 평가 금액 : {parseInt(item.currentValuePrice)}</li>
                  <br />
                </ul>
              );
            })}
        </ul>
      ) : (
        ''
      )}
    </MyAccountWrap>
  );
};

export default MyAccount;
