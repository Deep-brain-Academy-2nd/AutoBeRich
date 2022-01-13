# AutoBeRich Frontend

Nextjs + TypeScript 로 구성

## Structure

pages는 next에서 auto routing 되는 페이지들을 작성한다.
components에는 재활용 가능한 컴포넌트들과 함께 unit 단위 테스트코드를 작성한다.
shared에는 유틸 함수들이 작성되는 utils.ts와 interface와 enum들이 작성되는 const.ts를 작성한다.
styles에는 styled-component로 작성한 글로벌스타일(+reset)과 미디어쿼리를 포함한 테마 요소들을 작성한다. (styled.d.ts는 인터페이스 정의를 위한 파일이다.)

## TMI

cra를 사용할지 manual하게 구성할지 고민하던 중 next.js에 익숙하지 않기에 cra로 프로젝트 구성함.

## Refference

- [next + Redux 설정 참조](https://lemontia.tistory.com/988)
- [next + styled-component](https://velog.io/@danmin20/Next.js-Typescript-Styled-component-%EC%89%BD%EA%B2%8C-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
