import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export const HomePage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to{' '}
        <a href="https://github.com/Deep-brain-Academy-2nd/AutoBeRich">
          AutoBeRich!
        </a>
      </h1>
      <Link href="/test">
        <a>Reducer Test 페이지 이동</a>
      </Link>
    </>
  );
};

export default HomePage;
