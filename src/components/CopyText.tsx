import { css, Theme } from '@emotion/react';
import { useState } from 'react';

const TEST_USER = 'scrumble@email.com';

const CopyText = () => {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEST_USER);
      setCopied(true);
      setStatusMessage('✅ 복사 완료!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusMessage('❌ 복사 실패!');
    }
  };

  return (
    <button onClick={handleCopy} aria-label="테스트 계정 복사">
      {copied ? statusMessage : '📋 테스트 계정 복사'}
    </button>
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
