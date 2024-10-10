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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [titleFilter, setTitleFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>(
    CompletedFilter.All,
  );

  const visibleTodos = useMemo(
    () =>
      getFilteredTodos(todos, {
        completedFilter,
        titleFilter,
      }),
    [todos, completedFilter, titleFilter],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
                titleFilter={titleFilter}
                setTitleFilter={setTitleFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
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
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
