import '../styles/globals.css';
import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global-style';
import { wrapper } from '../store';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutoBeRich</title>
        <meta name="description" content="Auto Be Rich" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <TopBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
// app에 바인딩
export default wrapper.withRedux(MyApp);
