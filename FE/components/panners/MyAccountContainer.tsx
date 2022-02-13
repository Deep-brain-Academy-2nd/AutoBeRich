import React, { useEffect, useState } from 'react';

import tradingAPI from '../../apis/trading';
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
			const res = await tradingAPI.getAccountInfos(email);
			if (res.code === 200) {
				setUserInfo(res.coinInfo);
				setKrwInfo(res.upbit_accounts);
				setStrategy(res.strategy);
			} else {
				alert('정보를 가져오려면 로그인해주세요.');
			}
		} catch (error) {
			console.error(error);
		}
	};
	return <MyAccount userInfo={userInfo} krwInfo={krwInfo} strategy={strategy} />;
};

export default MyAccountContainer;
