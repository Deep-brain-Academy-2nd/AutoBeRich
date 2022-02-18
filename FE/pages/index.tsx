import type { NextPage } from 'next';
import HomePage from '../components/HomePage';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<HomePage />
			</main>
		</div>
	);
};

export default Home;
