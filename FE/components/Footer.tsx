import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterPart = styled.footer`
  width: 100%;
  height: 6%;
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: gray;
`;

function Footer() {
  return (
    <FooterPart>
      <p>{'Copyright © for AutoBeRich '}</p>
      AI Deepbrain by Dongwon & hyosung
    </FooterPart>
  );
}

export default Footer;
