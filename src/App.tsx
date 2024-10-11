import { FC, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { CompletedFilter } from './types/CompletedFilter';
import { getFilteredTodos } from './utils/getFilteredTodos';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [searchQuary, setSearchQuary] = useState('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>(
    CompletedFilter.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(
    () =>
      getFilteredTodos(todos, {
        completedFilter,
        searchQuary: searchQuary,
      }),
    [todos, completedFilter, searchQuary],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completedFilter={completedFilter}
                setCompletedFilter={setCompletedFilter}
                searchQuary={searchQuary}
                setSearchQuary={setSearchQuary}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
