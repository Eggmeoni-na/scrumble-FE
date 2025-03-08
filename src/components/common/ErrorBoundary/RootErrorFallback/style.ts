import { css } from '@emotion/react';

export const fallbackWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fff5e6;
  color: #333;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

export const errorMessageStyle = css`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 500px;
  margin-bottom: 2rem;
  color: #ffa502;
  font-weight: 700;
`;

export const buttonGroupStyle = css`
  display: flex;
  gap: 8px;
`;

export const buttonStyle = css`
  padding: 8px 16px;
  background: #ffa502;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ffbd43;
  }
`;

export const homeButton = css`
  background-color: white;
  color: #ffa502;
  border: 1px solid #ffa502;
`;

export const eggIconStyle = css`
  font-size: 5rem;
  margin-bottom: 1rem;
`;
