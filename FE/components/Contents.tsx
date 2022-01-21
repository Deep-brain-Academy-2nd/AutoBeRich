import React from 'react';
import styled from 'styled-components';
import Intro from './panners/Intro';
import MyAccountContainer from './panners/MyAccountContainer';
import SelectStrategy from './panners/SelectStrategy';

const Section = styled.section`
  width: 100%;
  height: 100%;
  font-size: 3rem;
  display: flex;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  justify-content: space-around;
  align-items: center;
  background-image: url('/images/background.png');
`;

const Contents = () => {
  return (
    <Section>
      <Intro />
      <MyAccountContainer />
      <SelectStrategy />
    </Section>
  );
};

export default Contents;
