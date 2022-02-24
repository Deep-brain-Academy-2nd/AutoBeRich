import React, { useEffect, useState } from 'react';

import tradingAPI from '../../apis/trading';
import MyAccount, { userInfoTypes } from './MyAccount';

export interface KrwInfoType {
	avg_buy_price: string;
	avg_buy_price_modified: boolean;
	balance: string;
	currency: string;
	locked: string;
	unit_currency: string;
}

const MyAccountContainer = () => {
	const [userInfo, setUserInfo] = useState<userInfoTypes>({
		totalMoney: '',
		coinList: {
			name: '',
			quantity: '',
			earningRate: '',
			entryPrice: '',
			avgBuyPrice: '',
			trade_price: '',
			currentValuePrice: '',
		},
	});
	const [strategy, setStrategy] = useState('');
	const [totalKRW, setTotalKRW] = useState(0);
	useEffect(() => {
		getAccountInfos();
	}, []);
	const getAccountInfos = async () => {
		try {
			const email = localStorage.getItem('email');
			const res = await tradingAPI.getAccountInfos(email);
			if (res.code === 200) {
				setUserInfo(res.coinInfo);
				setStrategy(res.strategy);
				setTotalKRW(parseInt(res.krwInfo[0].balance));
			} else {
				alert('정보를 가져오려면 로그인해주세요.');
			}
		} catch (error) {
			new Error('Failure Get AccountInfo');
		}
	};
	return <MyAccount userInfo={userInfo} strategy={strategy} totalKRW={totalKRW} />;
};

export default MyAccountContainer;
