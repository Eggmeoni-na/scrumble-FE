import { Add } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { TODO_TYPES } from '@/constants/todo';
import { useCreateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries/useTodo';
import { useToastStore } from '@/stores/toast';
import { useTodoStore } from '@/stores/todo';
import { PostTodoRequest } from '@/types';
import { css, Theme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, KeyboardEventHandler, useCallback, useState } from 'react';

const TodoForm = ({ squadId, selectedDay }: { squadId: number; selectedDay: string }) => {
  const [contents, setContents] = useState('');
  const createToast = useToastStore((state) => state.createToast);
  const setLastToDoId = useTodoStore((state) => state.setLastToDoId);
  const queryClient = useQueryClient();
  const { createTodoMutate } = useCreateTodo({
    onSuccess: async ({ data: { toDoId } }) => {
      createToast({ type: 'success', message: '투두가 등록되었어요 ✅', duration: 2000, showCloseButton: false });
      setLastToDoId(toDoId);
      queryClient.refetchQueries({
        queryKey: todoKeys.todos(squadId, selectedDay),
      });
    },
    onError: () => createToast({ type: 'failed', message: '투두 등록에 실패했어요 😢' }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contents.length) {
      createToast({
        type: 'warning',
        message: '할일을 입력해주세요',
      });
      return;
    }
    const newTodo: PostTodoRequest = {
      toDoType: TODO_TYPES.DAILY,
      contents,
      toDoAt: selectedDay,
    };
    createTodoMutate({ squadId, newTodo });
    setContents('');
  };

  const handleEnterSubmit: KeyboardEventHandler<HTMLFormElement> = useCallback((e) => {
    if (e.key !== 'Enter') return;
    if (!e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, []);

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <input
        type="text"
        value={contents}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setContents(e.target.value)}
        autoFocus
      />
      <IconWrapper
        css={addIconStyle}
        onClick={() => {
          // Button 태그로 인식하기 위한 로직
        }}
        onKeyDown={handleEnterSubmit}
      >
        <Add />
      </IconWrapper>
    </form>
  );
};

export default TodoForm;

const formStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.gray};
  border-radius: 12px;
  margin: 16px;

  & input {
    height: 40px;
    flex: 1;
    padding-left: 16px;
    color: ${theme.colors.text};
  }
`;

const addIconStyle = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.secondary};
  border-radius: 50%;
  margin-right: 8px;

  & svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;
