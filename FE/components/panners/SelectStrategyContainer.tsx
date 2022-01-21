import React, { useState, useEffect } from 'react';
import API from '../../apis';
import SelectStrategy from './SelectStrategy';

const SelectStrategyContainer = () => {
  const [strategy, setStrategy] = useState('');
  useEffect(() => {
    getAccountInfos();
  }, []);
  const getAccountInfos = async () => {
    const res = await API.put('/user');
    setStrategy(res.data);
    console.log(res);
  };
  return <SelectStrategy propsStrategy={strategy} />;
};

export default SelectStrategyContainer;
