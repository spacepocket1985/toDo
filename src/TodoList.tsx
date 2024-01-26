import { useState } from 'react';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeTaskStatus: (id: string) => void;
  addTask: (task: string) => void;
  changeFilter: (filter: FilterType) => void;
  filter: FilterType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export enum FilterType {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onChangeNewTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTaskTitle = event.target.value.trim();
    setNewTaskTitle(newTaskTitle);
    setError(null);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewTask();
    }
  };

  const onChangeHandler = (id: string) => {
    changeTaskStatus(id);
  };

  const addNewTask = (): void => {
    if (newTaskTitle.length === 0) {
      setError('Title is required');
      return;
    }
    addTask(newTaskTitle);
    setError(null);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => changeFilter(FilterType.ALL);
  const onActiveClickHandler = () => changeFilter(FilterType.ACTIVE);
  const onCompletedClickHandler = () => changeFilter(FilterType.COMPLETED);

  const { title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          className={error ? 'error' : ''}
          value={newTaskTitle}
          onChange={onChangeNewTaskTitleHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasks.map((task) => {
          const { id, title, isDone } = task;
          return (
            <li key={id} className={isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => {
                  onChangeHandler(id);
                }}
              />
              <span>{title}</span>
              <button
                onClick={() => {
                  removeTask(id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={filter === FilterType.ALL ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          {FilterType.ALL}
        </button>
        <button
          className={filter === FilterType.ACTIVE ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          {FilterType.ACTIVE}
        </button>
        <button
          className={filter === FilterType.COMPLETED ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          {FilterType.COMPLETED}
        </button>
      </div>
    </div>
  );
}
