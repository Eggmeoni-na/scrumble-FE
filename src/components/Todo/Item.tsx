import { ActionButton, Content, DeleteMode } from '@/components/Todo';
import { getStatusStyles, todoItemStyle } from '@/components/Todo/styles';
import { TODO_STATUS } from '@/constants/todo';
import { useTodoQueryParamsContext } from '@/context/todo';
import { useTodoDeleteActions, useTodoUpdateActions } from '@/hooks/todo';
import { ToDoDetail } from '@/types';
import { useTheme } from '@emotion/react';
import { memo, useMemo } from 'react';

const Item = ({ todo }: { todo: ToDoDetail }) => {
  const theme = useTheme();
  const { contents, toDoStatus } = todo;
  const isCompleted = toDoStatus === TODO_STATUS.COMPLETED;

  const queryParams = useTodoQueryParamsContext();
  const { isDeleteMode, handleConfirmDelete, toggleDeleteMode } = useTodoDeleteActions(todo.toDoId, queryParams);
  const todoUpdateActions = useTodoUpdateActions(todo, queryParams);

  const memoizedStatusStyle = useMemo(() => [todoItemStyle, getStatusStyles(isCompleted, theme)], [isCompleted, theme]);

  if (isDeleteMode) {
    return <DeleteMode onChangeMode={toggleDeleteMode} onDelete={handleConfirmDelete} />;
  }

  return (
    <li css={memoizedStatusStyle} aria-labelledby={`todo-${todo.toDoId}`}>
      <Content todo={todo} isCompleted={isCompleted} updateActions={todoUpdateActions} />
      <ActionButton contents={contents} updateActions={todoUpdateActions} onChangeDeleteMode={toggleDeleteMode} />
    </li>
  );
};

export default memo(Item);
