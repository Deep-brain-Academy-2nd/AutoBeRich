import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import { selectInfo } from '../store/reducers/userInfo';

const NavBar = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2%;
	height: 6%;
	width: 100%;
	font-size: 3rem;
	@media only screen and (max-width: 768px) {
		font-size: 2rem;
	}
`;

const TopBar = () => {
	// const info: any = useAppSelector(selectInfo);
	const [name, setName] = useState('');
	useEffect(() => {
		const localStorageName = localStorage.getItem('name');
		if (localStorageName) {
			setName(localStorageName);
		}
	}, [name]);
	const onLogout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		localStorage.removeItem('token');
		setName('');
	};

	return (
		<NavBar>
			<Link href="/">
				<a>AutoBeRich</a>
			</Link>
			<Link href="/about">
				<a>about</a>
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
