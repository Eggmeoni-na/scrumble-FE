import { editInputStyle } from '@/components/Todo/styles';
import { TodoUpdateActionsReturnType } from '@/hooks/todo';

const EditMode = ({ updateActions }: { updateActions: TodoUpdateActionsReturnType }) => {
  const { newContents, setNewContents, handleKeyPressForEdit } = updateActions;

  return (
    <input
      type="text"
      value={newContents}
      onChange={(e) => setNewContents(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyPressForEdit}
      css={editInputStyle}
      autoFocus
    />
  );
};

export default EditMode;
