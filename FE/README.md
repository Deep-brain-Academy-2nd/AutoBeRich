# AutoBeRich Frontend

Nextjs + TypeScript 로 구성

![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=Typescript&logoColor=white)
[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)]()
[![React Badge](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)]()
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=flat-square&logo=React&logoColor=white)
[![styled Badge](https://img.shields.io/badge/Styled-DB7093?style=flat-square&logo=styled-components&logoColor=white)]()
[![webpack Badge](https://img.shields.io/badge/webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=white)]()
[![babel Badge](https://img.shields.io/badge/babel-F9DC3E?style=flat-square&logo=babel&logoColor=black)]()
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=styled-components&logoColor=white)

## Structure

```
.
├── README.md
├── next.config.js
├── node_modules
├── package-lock.json
├── package.json
├── public
├── components # 컴포넌트 작성후 pages에서 렌더링, 페이지 단위 컴포넌트
│ ├── panners
│ │ ├── Intro.tsx
│ │ ├── MyAccount.tsx # 계좌조회 뷰
│ │ ├── MyAccountContainer.tsx # 계좌조회 로직
│ │ ├── SelectStrategy.tsx # 트레이딩 전략 선택 뷰
│ │ └── SelectStrategyContainer.tsx # 트레이딩 전략 선택 로직
│ ├── Contents.tsx
│ ├── Footer.tsx
│ ├── HomePage.tsx
│ └── TopBar.tsx
├── styles # global style정의, 그외 컴포넌트 style은 각 컴포넌트에서 정의
│ ├── global-style.ts
│ ├── globals.css
│ ├── Home.module.css
│ └── theme.ts
├── apis # 각 api 호출 모듈
├── pages # auto routing 되는 페이지 작성
│ ├── login
│ │ ├── loginPresenter.ts # view 관련 로직
│ │ ├── loginContainer.ts # 비즈니스 로직 관련
│ │ └── index.ts
│ ├── register
│ │ ├── registerPresenter.ts # view 관련 로직
│ │ ├── registerContainer.ts # 비즈니스 로직 관련
│ │ └── index.ts
│ ├── _app.tsx # 메인 페이지 호출
│ ├── _document.tsx # ssr 구동
│ ├── index.tsx # 첫 구동 페이지
├── store # redux store
│ ├── reducers
│ │ ├── userInfo.ts # (리듀서 모듈)
│ │ └── index.ts # (리듀서 모듈 통합)
│ ├── hooks.ts # (redux-tookkit hooks)
│ └── index.js # (store 생성 && wrapper 생성)
└── styles
```

pages는 next에서 auto routing 되는 페이지들을 작성한다.
components에는 재활용 가능한 컴포넌트들과 함께 unit 단위 테스트코드를 작성한다.
shared에는 유틸 함수들이 작성되는 utils.ts와 interface와 enum들이 작성되는 const.ts를 작성한다.
styles에는 styled-component로 작성한 글로벌스타일(+reset)과 미디어쿼리를 포함한 테마 요소들을 작성한다. (styled.d.ts는 인터페이스 정의를 위한 파일이다.)

## `Install & Execute`

### FE/.env

```
NEXT_PUBLIC_API_URL # server end point
```

## `DEV mode Scripts`

### FE

dev 개발시

```
yarn install 후 yarn dev
```

aws 배포시

```
yarn build(next build) 후 yarn start (next start)
```

## TMI

cra를 사용할지 manual하게 구성할지 고민하던 중 next.js에 익숙하지 않기에 cra로 프로젝트 구성함.

## Refference

- [next + Redux 설정 참조](https://lemontia.tistory.com/988)
- [next + styled-component](https://velog.io/@danmin20/Next.js-Typescript-Styled-component-%EC%89%BD%EA%B2%8C-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
