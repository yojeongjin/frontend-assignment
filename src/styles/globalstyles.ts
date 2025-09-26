import { createGlobalStyle } from 'styled-components';
// Pretendard 폰트
import 'pretendard/dist/web/static/pretendard.css';

const GlobalStyles = createGlobalStyle`
  /* Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
      'Malgun Gothic', sans-serif;
    height: 100%;
    font-size: 15px;
    line-height: 1.5;
    color: #0f1419;
    background-color: #fff;
    overflow-anchor: none;
    overscroll-behavior-y: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    -webkit-appearance:none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    all: unset;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    background: transparent;
  }

  ul, ol, li {
    list-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
