import React from 'react';
import Styled from 'styled-components';
import { krwInfoType } from './MyAccountContainer';

const MyAccountWrap = Styled.div`
    width: 30%;
    height: 40%;
    background-color: white;
    border-radius: 5%;
    size: 1rem;
    overflow: scroll;
    @media only screen and (max-width: 768px) {
      font-size: 2rem;
      width: 80%;
      height: 60%;
      margin: 1rem 0;
	  }
`;

interface userAccountInfoTypes {
	userInfo: userInfoTypes;
	krwInfo: krwInfoType;
	strategy: string;
	totalKRW: number;
}
export interface userInfoTypes {
	totalMoney: string;
	coinList: coinListTypes;
}
export interface coinListTypes {
	name: string;
	quantity: string;
	earningRate: string;
	entryPrice: string;
	avgBuyPrice: string;
	trade_price: string;
	currentValuePrice: string;
}

const MyAccount = ({ userInfo, krwInfo, strategy, totalKRW }: userAccountInfoTypes) => {
	return (
		<MyAccountWrap>
			{userInfo ? (
				<ul>
					<li>보유원화 : {totalKRW} 원</li>
					<li>총 매수금액 : {parseInt(userInfo.totalMoney)} 원</li>
					<li>선택 전략 : {strategy === 'Changing_Trading' ? '변동성매매' : ''}</li>
					<br />
					{userInfo &&
						Object.values(userInfo.coinList).map((item: coinListTypes, idx: number) => {
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
