import { useState } from 'react';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  addTask: (task: string) => void;
  changeFilter: (filter: FilterType) => void;
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

  const onChangeNewTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTaskTitle = event.target.value.trim();
    setNewTaskTitle(newTaskTitle);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewTask();
    }
  };

  const addNewTask = (): void => {
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => changeFilter(FilterType.ALL);
  const onActiveClickHandler = () => changeFilter(FilterType.ACTIVE);
  const onCompletedClickHandler = () => changeFilter(FilterType.COMPLETED);

  const { title, tasks, removeTask, changeFilter, addTask } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onChangeNewTaskTitleHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
          const { id, isDone, title } = task;
          return (
            <li key={id}>
              <input type="checkbox" checked={isDone} />
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
        <button onClick={onAllClickHandler}>{FilterType.ALL}</button>
        <button onClick={onActiveClickHandler}>{FilterType.ACTIVE}</button>
        <button onClick={onCompletedClickHandler}>{FilterType.COMPLETED}</button>
      </div>
    </div>
  );
}
