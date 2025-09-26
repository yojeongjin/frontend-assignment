import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { AppStateProvider } from '@/AppStateContext';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalstyles';
import theme from '@/styles/theme';
// components - common
import Layout from '@/components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01; // 뷰포트 높이의 1%
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // 초기 실행 시 화면 높이 계산
    setScreenSize();

    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Head>
          <title>소셜 미디어 피드</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppStateProvider>
  );
}
