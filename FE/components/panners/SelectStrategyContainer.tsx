import { NextRequest } from 'next/server';
import React, { useState, useEffect } from 'react';
import API from '../../apis';
import SelectStrategy from './SelectStrategy';

const SelectStrategyContainer = () => {
  const [strategy, setStrategy] = useState('');
  const changeStrategy = async (chooseStrategy: string) => {
    if (chooseStrategy === 'Changing_Trading') {
      const res = await API.put('/trading/updateTradingStrategy', {
        email: localStorage.getItem('email'),
        strategy: chooseStrategy,
      });
      if (res.data.code === 200) {
        alert('변경완료');
        setStrategy(res.data);
      } else {
        console.log(res.data, '변경실패');
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
      const res = await API.post('/trading/updateStatusAutoTraiding', req);
      if (res.data.message === 'Change_status_true') {
        alert('자동 매매가 시작됩니다');
      } else if (res.data.message === 'Change_status_false') {
        alert('자동 매매가 중지됩니다.');
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
