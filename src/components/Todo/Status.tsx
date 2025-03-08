import { Check } from '@/assets/icons';
import IconWrapper from '@/components/IconWrapper';
import { checkedStyle, checkIconStyle } from '@/styles/common';

const Status = ({ isCompleted }: { isCompleted: boolean }) => (
  <IconWrapper
    aria-label={isCompleted ? '완료된 투두' : '완료되지 않은 투두'}
    aria-checked={isCompleted}
    role="checkbox"
    css={[checkIconStyle, isCompleted && checkedStyle]}
  >
    {isCompleted && <Check />}
  </IconWrapper>
);

export default Status;
