# AutoBeRich Backend

## 구성

Express + TypeScript (figma 같은거로 그림 그려도 좋겟네여)

## 프로젝트 구조

- 3 계층 구조
  ![3 Layer Architecture](./images/img.png)
- 비지니스 로직은 Controller X Service O
- 환경설정 값은 configuration manager를 사용(dotenv)
- node.js 서버 설정파일을 작은 모듈들로 분리하여 독립적으로 로드

**참고 블로그 : [프로젝트 구조](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0#pubsub-%EA%B3%84%EC%B8%B5%EB%8F%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%8B%AD%EC%8B%9C%EC%98%A4-%EF%B8%8F)**

- [cors 추가](https://www.twilio.com/blog/add-cors-support-express-typescript-api)
