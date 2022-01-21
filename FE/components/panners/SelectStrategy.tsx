import {
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';

const SelectStrategyWrap = Styled.div`
    width: 20%;
    height: 30%;
    background-color: white;
    border-radius: 5%;
`;

const SelectStrategy = (propsStrategy) => {
  const [strategy, setStrategy] = useState('');
  const handleChange = (event: any) => {
    setStrategy(event.target.value);
  };
  useEffect(() => {
    console.log(propsStrategy, 'propsStrategy');
  }, []);
  return (
    <SelectStrategyWrap>
      <FormControl
        fullWidth
        sx={{
          marginTop: 8,
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
          <MenuItem value={'변동성매매'}>변동성매매</MenuItem>
          <MenuItem value={'RSI(추가예정)'}>RSI(추가예정)</MenuItem>
          <MenuItem value={'추가전략(추가예정)'}>추가전략(추가예정)</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        전략 수정
      </Button>
    </SelectStrategyWrap>
  );
};

export default SelectStrategy;
