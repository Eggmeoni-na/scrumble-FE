import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface ProgressRateProps {
  percent: number;
}

const ProgressRate = ({ percent }: ProgressRateProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => setIsComplete(true), 300);
    } else {
      setIsComplete(false);
    }
  }, [percent]);

  return (
    <Wrapper>
      <Circle>
        <Fill style={{ height: `${percent}%` }} />
        <PercentText>{percent}</PercentText>
      </Circle>
      {isComplete && <GlowEffect />}
    </Wrapper>
  );
};

export default ProgressRate;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  overflow: hidden;
`;

const Fill = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(180deg, rgb(255, 174, 0) 10%, rgba(255, 191, 0, 1) 72%, rgba(255, 246, 0, 1) 100%);
  transition: height 0.8s ease;
`;

const PercentText = styled.p`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  line-height: 0.8rem;
  font-weight: bold;
  color: #b45309;
`;

/* 완료 시 퍼지는 Glow */
const glow = keyframes`
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(1.3); opacity: 0; }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(250, 204, 21, 0.6), transparent);
  animation: ${glow} 1.2s ease-out 3 forwards; /* 3번 반복 후 마지막 상태 유지 */
`;
