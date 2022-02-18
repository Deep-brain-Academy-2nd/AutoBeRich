import React from 'react';
import styled from 'styled-components';
import Intro from './panners/Intro';
import MyAccountContainer from './panners/MyAccountContainer';

import SelectStrategyContainer from './panners/SelectStrategyContainer';

const Section = styled.section`
	width: 100%;
	height: 100%;
	font-size: 3rem;
	display: flex;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
		padding: 2rem 0;
	}
	justify-content: space-around;
	align-items: center;
	background-image: url('/images/background.png');
`;

const HomePage = () => {
	return (
		<Section>
			<Intro />
			<MyAccountContainer />
			<SelectStrategyContainer />
		</Section>
	);
};

export default HomePage;
