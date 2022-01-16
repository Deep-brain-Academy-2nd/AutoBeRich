import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../hooks/user';

function LoginPresenter({ handleSubmit }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="loginMain">
        <h1>로그인</h1>
        <div className="logWrapper">
          <form onSubmit={handleSubmit}>
            {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
            <div className="form-floating mb-2">
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="이메일 주소"
              />
              <label htmlFor="email">이메일 주소</label>
            </div>
            <div className="form-floating mb-2">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="비밀번호"
              />
              <label htmlFor="password">비밀번호</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
              로그인
            </button>
          </form>

          <button
            type="button"
            className="w-100 btn btn-lg btn-secondary px-4 gap-3"
            onClick={() => router.replace('/')}
          >
            홈으로
          </button>
          <Link href="/register">가입하기</Link>
          <Link href="/forget-password">
            <a>Forget password</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPresenter;
