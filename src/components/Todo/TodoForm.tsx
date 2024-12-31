import { Form } from '@/components/common';
import { TODO_TYPES } from '@/constants/todo';
import { useToastHandler, useValidatedUser } from '@/hooks';
import { useCreateTodo } from '@/hooks/mutations';
import { todoKeys } from '@/hooks/queries';
import { InfiniteQueryData } from '@/hooks/queries/types';
import { ApiResponse, PostTodoRequest, ToDoDetail } from '@/types';
import { css, Theme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { FormEvent, KeyboardEventHandler, useCallback, useState } from 'react';

const TodoForm = ({ squadId, selectedDay }: { squadId: number; selectedDay: string }) => {
  const { userId } = useValidatedUser();
  const [contents, setContents] = useState('');
  const { successToast, failedToast, warningToast } = useToastHandler();
  const queryClient = useQueryClient();

  const { createTodoMutate } = useCreateTodo({
    onSuccess: async ({ data }) => {
      successToast('투두 등록에 성공했어요');
      queryClient.setQueryData(
        todoKeys.todosByMember(squadId, selectedDay, userId),
        (prevData: InfiniteQueryData<ApiResponse<ToDoDetail[]>>) => ({
          ...prevData,
          pages: prevData.pages.map((page, index) => (index === 0 ? { ...page, data: [data, ...page.data] } : page)),
        }),
      );
    },
    onError: () => failedToast('투두 등록에 실패했어요'),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contents.length) {
      warningToast('할일을 입력해주세요');
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
    <Form
      type="text"
      onSubmit={handleSubmit}
      onKeyDown={handleEnterSubmit}
      value={contents}
      onChange={(e) => setContents(e.target.value)}
      placeholder="할일을 입력해주세요"
      style={formStyle}
    />
  );
};

export default TodoForm;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formStyle = (theme: Theme) => css`
  margin: 16px;
`;
