import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';

const RegisterPresenter = ({ handleSubmit }) => {
  // useEffect(() => {
  //   // redirect to home if user is authenticated
  //   if (user) Router.replace('/');
  // }, [user]);
  const RegisterMain = styled.div`
    color: #fff;
    height: 88%;
    size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url('/images/background.png');
  `;
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <RegisterMain>
        <h1 className="display-5 fw-bold mb-5">가입하기</h1>
        <div className="col-lg-6 mx-auto">
          <form onSubmit={handleSubmit}>
            {/* {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null} */}
            <div className="form-floating mb-2">
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                placeholder="이름"
              />
              <label htmlFor="name">이름</label>
            </div>
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
            <div className="form-floating mb-2">
              <input
                id="secret_key"
                name="secret_key"
                type="key"
                className="form-control"
                placeholder="secret key"
              />
              <label htmlFor="key">secret key</label>
            </div>
            <div className="form-floating mb-2">
              <input
                id="access_key"
                name="access_key"
                type="key"
                className="form-control"
                placeholder="access key"
              />
              <label htmlFor="key">access key</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
              가입하기
            </button>
          </form>
          <button
            type="button"
            className="w-100 btn btn-lg btn-secondary px-4 gap-3"
            onClick={() => Router.replace('/')}
          >
            홈으로
          </button>
        </div>
      </RegisterMain>
    </>
  );
};

export default RegisterPresenter;
