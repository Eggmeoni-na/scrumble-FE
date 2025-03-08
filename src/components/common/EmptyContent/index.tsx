import { containerStyle } from '@/components/common/EmptyContent/style';
import { HTMLAttributes } from 'react';

const EmptyContent = ({ message, ...rest }: { message: string } & HTMLAttributes<HTMLElement>) => (
  <div css={containerStyle} {...rest}>
    <span>🪹</span>
    <p>{message}</p>
  </div>
);

export default EmptyContent;
