import React from 'react';
import styled from 'styled-components';

const FooterPart = styled.footer`
	width: 100%;
	height: 6%;
	font-size: 2rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: gray;
	@media only screen and (max-width: 768px) {
		font-size: 1rem;
	}
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
