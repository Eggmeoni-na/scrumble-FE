import { Check } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { completedContentStyle, contentWrapperStyle, getStatusStyles, todoItemStyle } from '@/components/Todo/styles';
import { TODO_STATUS } from '@/constants/todo';
import { checkedStyle, checkIconStyle } from '@/styles/common';
import { ToDoDetail } from '@/types';
import { css, useTheme } from '@emotion/react';

const MemberTodoItem = ({ todo }: { todo: ToDoDetail }) => {
  const isCompleted = todo.toDoStatus === TODO_STATUS.COMPLETED;
  const theme = useTheme();
  return (
    <li css={[todoItemStyle, getStatusStyles(isCompleted, theme), memberTodoItemStyle]}>
      <div css={contentWrapperStyle}>
        <IconWrapper
          aria-label={isCompleted ? '완료' : '미완료'}
          aria-checked={isCompleted}
          role="checkbox"
          css={[checkIconStyle, isCompleted && checkedStyle]}
        >
          {isCompleted && <Check />}
        </IconWrapper>
        <p css={isCompleted && completedContentStyle}>{todo.contents}</p>
      </div>
    </li>
  );
};

export default MemberTodoItem;

const memberTodoItemStyle = css`
  cursor: default;
  opacity: 0.5;

  & div {
    padding: 1px 6px;
  }
`;
