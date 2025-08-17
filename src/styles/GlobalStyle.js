import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Noto Sans KR',
      'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.bg};
    animation: pageEnter 0.5s ease-out both;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
  }

  /* 애니메이션 정의 */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Generic reveal utility */
  .reveal { opacity: 0; transform: translateY(10px); }
  .reveal.is-inview { opacity: 1; transform: none; animation: fadeIn 600ms ease var(--reveal-delay, 0ms) both; }

  /* Scroll cue animation */
  @keyframes scrollWheel {
    0% { transform: translate(-50%, 0); opacity: 1; }
    60% { transform: translate(-50%, 10px); opacity: 0; }
    100% { opacity: 0; }
  }

  /* 유틸리티 클래스 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100vw;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 ${({ theme }) => theme.spacing[6]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing[8]};
    }
  }
`;

export default GlobalStyle;
