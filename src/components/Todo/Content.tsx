import { EditMode, Status } from '@/components/Todo';
import { completedContentStyle, contentWrapperStyle } from '@/components/Todo/styles';
import { TodoUpdateActionsReturnType } from '@/hooks/todo';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { ToDoDetail } from '@/types';
import { memo } from 'react';

type Props = {
  todo: ToDoDetail;
  isCompleted: boolean;
  updateActions: TodoUpdateActionsReturnType;
};

const Content = ({ todo, isCompleted, updateActions }: Props) => {
  const { isEditMode, toggleTodoStatus } = updateActions;

  if (isEditMode) {
    return <EditMode updateActions={updateActions} />;
  }

  return (
    <button onClick={toggleTodoStatus} css={fullSizeButtonStyle} aria-label="투두 상태 변경">
      <div css={contentWrapperStyle}>
        <Status isCompleted={isCompleted} />
        <p id={`todo-${todo.toDoId}`} css={isCompleted && completedContentStyle} style={{ textAlign: 'left' }}>
          {todo.contents}
        </p>
      </div>
    </button>
  );
};

export default memo(Content);
