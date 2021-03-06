import React from 'react';
import Image from 'next/image';
import Styled from 'styled-components';

import oldMan from '../../public/images/oldMan.png';
import money from '../../public/images/money.png';
import Link from 'next/link';

const IntroWrap = Styled.div`
    width: 30%;
    color: #fff;
    @media only screen and (max-width: 768px) {
      width: 80%;
      font-size: 2rem;
      display: flex;
      justify-content: space-around;
	  }
`;
const TextWrap = Styled.div`
  @media only screen and (max-width: 768px) {
      width: 100%;
	  }
`;

const Intro = () => {
	return (
		<IntroWrap>
			<Image src={oldMan} alt="oldMan" />
			<Link href="/about" passHref>
				<TextWrap>
					<p>내 계좌 정보를 한 눈에</p>
					<p>확인하고 전략매매를 할 수 있는</p>
					<p>
						AutoBeRich <Image src={money} alt="money" />
					</p>
				</TextWrap>
			</Link>
		</IntroWrap>
	);
};

export default Intro;
