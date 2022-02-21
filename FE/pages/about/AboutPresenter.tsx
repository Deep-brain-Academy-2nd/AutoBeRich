import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import oldMan from '../../public/images/oldMan.png';
import money from '../../public/images/money.png';
import tradingCapture from '../../public/images/trading_capture.png';
import tradingWallet from '../../public/images/trading_wallet.png';

const AboutMain = styled.div`
	color: #fff;
	height: 88%;
	size: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: url('/images/background.png');
	overflow: scroll;
`;

const LargeSize = styled.div`
	font-size: 2rem;
	height: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 5%;
`;
const AboutHeader = styled.div`
	display: flex;
	font-size: 2rem;
	text-align: center;
	line-height: 3;
	margin-top: 70%;
`;

const StrategyText = styled.a`
	font-size: 2rem;
	margin-bottom: 5%;
`;

const ImageWrap = styled.div`
	width: 60%;
	margin: 10% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function AboutPresenter() {
	return (
		<AboutMain>
			<AboutHeader>
				<Image src={oldMan} alt="oldMan" />
				<p>AutoBeRich</p>
				<Image src={money} alt="money" />
			</AboutHeader>
			<LargeSize>
				<ul>
					<li>원하는 전략 (현재는 변동성 매매 전략만 구현)</li>
					<li>코인 자동매수매매를 선택하여</li>
					<li>24시간 작동을 하고</li>
					<li>내가 자는 동안에도 돈을 벌어주는</li>
					<li>나를 부자로 만들어줄 서비스.</li>
				</ul>
			</LargeSize>
			<LargeSize>
				<ul>
					<li> 비트코인 자동 매매 서비스</li>
					<li> 회원 가입을 통해 개인 정보 등록 후 </li>
					<li>(accessKey, secretKey)</li>
					<li> 원하는 자동 매매전략을 선택 후</li>
					<li>(변동성 전략, rsi 지수전략, 볼린저밴드 전략등)</li>
					<li> 24시간 자동 매매 전략 서비스 제공</li>
				</ul>
			</LargeSize>
			<ImageWrap>
				<Image src={tradingWallet} alt="trading_wallet" />
				<Image src={tradingCapture} alt="trading_status" />
			</ImageWrap>
			<StrategyText href="https://tvextbot.github.io/post/indicator_vbi/" target="_blank" rel="noreferrer">
				변동성 돌파전략에 대해서
			</StrategyText>
		</AboutMain>
	);
}

export default AboutPresenter;
