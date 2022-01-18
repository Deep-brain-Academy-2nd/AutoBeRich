import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  height: 100%;
  font-size: 3rem;
  display: flex;
  align-items: center;
  background-image: url('/images/background.png');
`;

const Contents = () => {
  return <Section>Main</Section>;
};

export default Contents;
