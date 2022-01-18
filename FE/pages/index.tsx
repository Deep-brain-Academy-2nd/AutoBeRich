import type { NextPage } from 'next';
import HomePage from '../components/HomePage';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
