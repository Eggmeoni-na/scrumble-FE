import { Delete, Edit } from '@/assets/icons';
import { Button } from '@/components/common';
import IconWrapper from '@/components/IconWrapper';

import { actionStyle, editActionStyle } from '@/components/Todo/styles';
import { TodoUpdateActionsReturnType } from '@/hooks/todo';
import { memo } from 'react';

type Props = {
  contents: string;
  updateActions: TodoUpdateActionsReturnType;
  onChangeDeleteMode: () => void;
};

const ActionButton = ({ contents, updateActions, onChangeDeleteMode }: Props) => {
  const { isEditMode, setIsEditMode, setNewContents, handleEditContents } = updateActions;

  if (isEditMode) {
    return (
      <div css={editActionStyle} role="presentation">
        <Button id="edit-btn" text="수정" variant="confirm" onClick={handleEditContents} aria-label="수정하기" />
        <Button
          text="취소"
          variant="default"
          onClick={() => {
            setNewContents(contents);
            setIsEditMode(false);
          }}
          aria-label="투두 수정 취소"
        />
      </div>
    );
  }
  return (
    <div css={actionStyle} role="presentation">
      <IconWrapper onClick={() => setIsEditMode(true)} aria-label="투두 수정">
        <Edit />
      </IconWrapper>
      <IconWrapper onClick={onChangeDeleteMode} aria-label="투두 삭제">
        <Delete />
      </IconWrapper>
    </div>
  );
};

export default memo(ActionButton);
