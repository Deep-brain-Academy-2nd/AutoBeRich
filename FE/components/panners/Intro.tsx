import React from 'react';
import Image from 'next/image';
import Styled from 'styled-components';

import oldMan from '../../public/images/oldMan.png';
import money from '../../public/images/money.png';

const IntroyWrap = Styled.div`
    width: 30%;
    color: #fff;
`;

const Introy = () => {
  return (
    <IntroyWrap>
      {/* <Image src={oldMan} alt="oldMan" /> */}
      <div>
        <p>내 계좌 정보를 한 눈에</p>
        <p>확인하고 전략매매를 할 수 있는</p>
        <p>{/* AutoBeRich <Image src={money} alt="money" /> */}</p>
      </div>
    </IntroyWrap>
  );
};

export default Introy;
