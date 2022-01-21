import React, { useState, useEffect } from 'react';
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
  const [name, setName] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setName(localStorage.getItem('email'));
    }
  });
  const onLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setName('');
  };

  return (
    <NavBar>
      <Link href="/">
        <a>AutoBeRich</a>
      </Link>
      {name ? (
        <>
          {name}
          <Link href="/login">
            <a onClick={onLogout}>로그아웃</a>
          </Link>
        </>
      ) : (
        <Link href="/login">
          <a>로그인하기</a>
        </Link>
      )}
    </NavBar>
  );
};

export default TopBar;
