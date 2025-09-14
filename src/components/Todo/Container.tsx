import { TodoList } from '@/components/Todo';
import { TodoQueryParams } from '@/types';

type Props = {
  isMeSelected: boolean;
  queryParams: TodoQueryParams;
};

const Container = ({ isMeSelected, queryParams }: Props) => {
  return <TodoList isMeSelected={isMeSelected} queryParams={queryParams} />;
};

export default Container;
