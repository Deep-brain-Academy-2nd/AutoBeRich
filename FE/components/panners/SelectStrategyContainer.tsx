import React, { useState, useEffect } from 'react';
import API from '../../apis';
import tradingAPI, { updateTradingApiResType } from '../../apis/trading';
import SelectStrategy from './SelectStrategy';

const SelectStrategyContainer = () => {
	const [strategy, setStrategy] = useState('');
	const changeStrategy = async (chooseStrategy: string) => {
		if (chooseStrategy === 'Changing_Trading') {
			const param: updateTradingApiResType = {
				email: localStorage.getItem('email'),
				strategy: chooseStrategy,
			};
			const result = await tradingAPI.updateTradingStrategy(param);

			if (result.code === 200) {
				alert('변경완료');
				setStrategy(result);
			} else {
				console.log(result, '변경실패');
				alert('변경 실패하였습니다.');
			}
		} else {
			alert('현재는 변동성 매매 전략만 선택 가능합니다.');
			return;
		}
	};

	const changeTradingStatus = async (status: boolean) => {
		try {
			const req: {
				status: boolean;
				email: string | null;
			} = {
				status,
				email: localStorage.getItem('email'),
			};
			if (status) {
				if (confirm('click하시면 확인을 클릭하시면 자동매매가 시작됩니다.')) {
					const res = await tradingAPI.updateStatusAutoTraiding(req);
					console.log(res);
					if (status) {
						if (res.code === 200) {
							alert('자동 매매가 시작하였습니다.');
						} else {
							alert('자동 매매 시작을 하지 못하였습니다. 잠시 후 다시 시도해주세요.');
						}
					}
				}
			} else {
				if (confirm('click하시면 확인을 클릭하시면 자동매매가 종료됩니다.')) {
					const res = await tradingAPI.updateStatusAutoTraiding(req);
					if (res.code === 200) {
						alert('자동 매매가 중지됩니다.');
					} else {
						alert('자동 매매 중지에 실패하였습니다. 잠시 후 다시 시도해주세요.');
					}
				}
			}
		} catch (error) {
			alert('매매 선택이 실패하였습니다.');
			console.error(error);
		}
	};
	return (
		<SelectStrategy
			propsStrategy={strategy}
			changeStrategy={changeStrategy}
			changeTradingStatus={changeTradingStatus}
		/>
	);
};

export default SelectStrategyContainer;
