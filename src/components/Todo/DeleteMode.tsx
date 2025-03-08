import { Close } from '@/assets/icons';
import { Button } from '@/components/common';
import IconWrapper from '@/components/IconWrapper';
import { cancelButtonStyle, deleteButtonStyle, deleteModeStyle, todoItemStyle } from '@/components/Todo/styles';

type Props = {
  onDelete: VoidFunction;
  onChangeMode: VoidFunction;
};

const DeleteMode = ({ onDelete, onChangeMode }: Props) => (
  <li css={[todoItemStyle, deleteModeStyle]}>
    <Button onClick={onDelete} text="삭제" css={deleteButtonStyle} aria-label="삭제" />
    <IconWrapper css={cancelButtonStyle} onClick={onChangeMode} aria-label="삭제 취소">
      <Close />
    </IconWrapper>
  </li>
);

export default DeleteMode;
