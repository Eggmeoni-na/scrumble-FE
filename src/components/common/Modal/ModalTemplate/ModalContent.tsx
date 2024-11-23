import { ModalStyle } from '@/types';
import { PropsWithChildren, memo } from 'react';

const ModalContent = ({ children, styleType = 'common' }: PropsWithChildren & { styleType?: ModalStyle }) => <div className={`modal-content ${styleType}`}>{children}</div>;

export default memo(ModalContent);
