import { Todo } from '../types/Todo';
import { CompletedFilter } from '../types/CompletedFilter';

interface Props {
  completedFilter: CompletedFilter;
  titleFilter: string;
}

export function getFilteredTodos(
  todos: Todo[],
  { completedFilter, titleFilter }: Props,
) {
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(todo => {
    switch (completedFilter) {
      case CompletedFilter.Active:
        return todo.completed === false;
      case CompletedFilter.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });

  const normalizedTitleFilter = titleFilter.toLocaleLowerCase().trim();

  if (normalizedTitleFilter.length) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLocaleLowerCase().includes(normalizedTitleFilter),
    );
  }

  return filteredTodos;
}
