import type { AppProps } from 'next/app';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalstyles';
import theme from '@/styles/theme';
// components - common
import Layout from '@/components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
