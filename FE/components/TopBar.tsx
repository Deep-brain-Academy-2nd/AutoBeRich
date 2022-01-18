import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6%;
  width: 100%;
  font-size: 3rem;
`;

const TopBar = () => {
  return (
    <NavBar>
      <Link href="/">
        <a>AutoBeRich</a>
      </Link>
      <Link href="/login">
        <a>로그인하기</a>
      </Link>
    </NavBar>
  );
};

export default TopBar;
