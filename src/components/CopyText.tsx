import { css, Theme } from '@emotion/react';
import { useState } from 'react';

const CopyText = () => {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const email = 'scrumble@email.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatusMessage('✅ 복사 완료!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusMessage('❌ 복사 실패!');
    }
  };

  return (
    <div css={containerStyle}>
      <span>📋 테스트 계정 복사: </span>
      <button onClick={handleCopy} aria-label="테스트 계정 복사">
        {copied ? statusMessage : email}
      </button>
    </div>
  );
};

export default CopyText;

const containerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  ${theme.typography.size_10}

  & span {
    font-weight: 500;
    margin-top: 2px;
  }

  & button {
    color: ${theme.colors.primary};
  }
`;
