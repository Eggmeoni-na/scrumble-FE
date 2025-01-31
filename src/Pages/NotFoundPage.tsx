import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div css={fallbackWrapperStyle}>
      <div css={eggIconStyle}>🥚</div>
      <p css={errorMessageStyle}>페이지를 찾을 수 없어요</p>
      <div css={buttonGroupStyle}>
        <button css={[buttonStyle, homeButton]} onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

const fallbackWrapperStyle = css`
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

const errorMessageStyle = css`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 500px;
  margin-bottom: 2rem;
  color: #ffa502;
  font-weight: 700;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 8px;
`;

const buttonStyle = css`
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

const homeButton = css`
  background-color: white;
  color: #ffa502;
  border: 1px solid #ffa502;
`;

const eggIconStyle = css`
  font-size: 5rem;
  margin-bottom: 1rem;
`;
