import { Check } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { checkedStyle, checkIconStyle, contentStyle, getStatusStyles, todoItemStyle } from '@/components/Todo';
import { TODO_STATUS } from '@/constants/todo';
import { ToDoDetail } from '@/types';
import { css, useTheme } from '@emotion/react';

const MemberTodoItem = ({ todo }: { todo: ToDoDetail }) => {
  const isCompleted = todo.toDoStatus === TODO_STATUS.COMPLETED;
  const theme = useTheme();
  return (
    <li css={[todoItemStyle(), getStatusStyles(isCompleted, theme), memberTodoItemStyle]}>
      <div css={contentStyle}>
        <IconWrapper
          aria-label={isCompleted ? 'Completed todo' : 'Uncompleted todo'}
          aria-checked={isCompleted}
          role="checkbox"
          css={[checkIconStyle, isCompleted && checkedStyle]}
        >
          {isCompleted && <Check />}
        </IconWrapper>
        <p>{todo.contents}</p>
      </div>
    </li>
  );
};

export default MemberTodoItem;

const memberTodoItemStyle = css`
  cursor: default;
  opacity: 0.5;
`;
