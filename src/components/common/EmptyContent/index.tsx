import { HTMLAttributes } from 'react';

import { EmotionSadLine } from '@/assets/icons';

import { containerStyle } from '@/components/common/EmptyContent/style';
import IconWrapper from '@/components/IconWrapper';

const EmptyContent = ({ message, ...rest }: { message: string } & HTMLAttributes<HTMLElement>) => (
  <div css={containerStyle} {...rest}>
    <IconWrapper style={{ width: '64px', height: '64px' }} aria-label="빈 내용 안내 아이콘">
      <EmotionSadLine />
    </IconWrapper>
    <p>{message}</p>
  </div>
);

export default EmptyContent;
