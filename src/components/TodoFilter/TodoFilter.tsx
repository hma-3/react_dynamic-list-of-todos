import React from 'react';
import { CompletedFilter } from '../../types/CompletedFilter';

interface Props {
  completedFilter: CompletedFilter;
  setCompletedFilter: React.Dispatch<React.SetStateAction<CompletedFilter>>;
  titleFilter: string;
  setTitleFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<Props> = ({
  completedFilter,
  setCompletedFilter,
  titleFilter,
  setTitleFilter,
}) => {
  const handleSelectComplitedFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setCompletedFilter(event.target.value as CompletedFilter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={handleSelectComplitedFilter}
          >
            <option value={CompletedFilter.All}>All</option>
            <option value={CompletedFilter.Active}>Active</option>
            <option value={CompletedFilter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titleFilter}
          onChange={event => setTitleFilter(event.target.value.trimStart())}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!titleFilter.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitleFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
