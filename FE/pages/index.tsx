import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AutoBeRich</title>
        <meta name="description" content="Auto Be Rich" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://github.com/Deep-brain-Academy-2nd/AutoBeRich">
            AutoBeRich!
          </a>
        </h1>
        <Link href="/test">
          <a>Reducer Test 페이지 이동</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
