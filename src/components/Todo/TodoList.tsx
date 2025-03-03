import { MemberTodoItem } from '@/components/Member';
import { memberTodoListStyle, todoContainerStyle } from '@/components/Todo/styles';
import TodoItem from '@/components/Todo/TodoItem';
import { useInfinite } from '@/hooks';
import { ToDoDetail } from '@/types';

type Props = {
  todos: ToDoDetail[];
  loadMoreTodos: VoidFunction;
  hasNextPage: boolean;
  isMeSelected: boolean;
  squadMemberId: number;
};

export const TodoList = ({ todos, loadMoreTodos, hasNextPage, isMeSelected, squadMemberId }: Props) => {
  const { loadMoreRef } = useInfinite(loadMoreTodos, hasNextPage);

  return (
    <ul css={[todoContainerStyle, !isMeSelected && memberTodoListStyle]} aria-label="투두 리스트">
      {todos.map((todo) =>
        isMeSelected ? (
          <TodoItem key={todo.toDoId} todo={todo} squadMemberId={squadMemberId} />
        ) : (
          <MemberTodoItem key={todo.toDoId} todo={todo} />
        ),
      )}
      {todos.length > 0 && (
        <>
          <br />
          <div ref={loadMoreRef} />
        </>
      )}
    </ul>
  );
};
