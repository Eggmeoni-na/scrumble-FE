import { css, Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  /* Reset CSS */

  :root {
    --color-text-gray: #616161;
    --color-primary: #ffa500;
    --color-secondary: #ffd700;
    --color-success: #50d133;
    --color-warning: #ffc107;
    --color-failed: #ff382a;
    --color-primary-bg: #fdf8e1;
    --color-success-bg: #e8f1e6;
    --color-default-bg: #f5f5f5;
    --color-failed-bg: #ffe2da;
  }

  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    src: url('fonts/Pretendard-Light.subset.woff2') format('font-woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    src: url('fonts/Pretendard-Medium.subset.woff2') format('font-woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    src: url('fonts/Pretendard-Bold.subset.woff2') format('font-woff2');
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background.lightYellow};
  }

  body {
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border-style: none;
    background-color: transparent;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
  }

  /* Add global styles */
`;

export const scrollBarStyle = css`
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(212, 212, 212, 0.7);
    border-radius: 10px;
  }

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: rgba(212, 212, 212, 0.7) transparent;
  }
`;
