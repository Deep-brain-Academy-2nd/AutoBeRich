import {
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';

const SelectStrategyWrap = Styled.div`
    width: 20%;
    height: 30%;
    background-color: white;
    border-radius: 5%;
`;

const SelectStrategy = ({
  propsStrategy,
  changeStrategy,
  changeTradingStatus,
}) => {
  const [strategy, setStrategy] = useState('');
  const handleChange = (event: any) => {
    if (event.target.value !== 'Changing_Trading') {
      alert('현재는 변동성매매만 선택 가능합니다.');
      return;
    } else {
      setStrategy('Changing_Trading');
    }
  };
  useEffect(() => {
    console.log(propsStrategy, 'propsStrategy');
  }, []);
  return (
    <SelectStrategyWrap>
      <FormControl
        fullWidth
        sx={{
          marginTop: 4,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <InputLabel id="demo-simple-select-label">Select Strategy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="strategy"
          value={strategy}
          onChange={handleChange}
        >
          <MenuItem value={'Changing_Trading'}>변동성매매</MenuItem>
          <MenuItem value={'Rsi_Trading'}>RSI(추가예정)</MenuItem>
          <MenuItem value={'Additional plans'}>추가전략(추가예정)</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{ display: 'flex', justifyContent: 'center' }}
        onClick={() => changeStrategy(strategy)}
      >
        <Button
          type="submit"
          size="large"
          variant="outlined"
          sx={{ mt: 2, mb: 2 }}
        >
          전략 수정
        </Button>
      </Box>
      <Box
        sx={{ '& button': { m: 1 }, display: 'flex', flexDirection: 'column' }}
      >
        <Button
          type="submit"
          color="success"
          size="large"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => changeTradingStatus(true)}
        >
          매매 시작
        </Button>
        <Button
          type="submit"
          color="error"
          size="large"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => changeTradingStatus(false)}
        >
          매매 중지
        </Button>
      </Box>
    </SelectStrategyWrap>
  );
};

export default SelectStrategy;
