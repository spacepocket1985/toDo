import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { FilterType } from './types/enums';

type PropsType = {
  idList: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeTaskStatus: (id: string, todoListId: string) => void;
  addTask: (task: string, todoListId: string) => void;
  changeFilter: (filter: FilterType, todoListId: string) => void;
  changeTaskTitle: (id: string, todoListId: string, title: string) => void;
  changeTodoListTitle: (todoListId: string, title: string) => void;
  removeTodoList: (todoListId: string) => void;
  filter: FilterType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function TodoList(props: PropsType) {
  const onChangeHandler = (id: string) => {
    changeTaskStatus(id, idList);
  };

  const onChangeTitleHandler = (newTaskTitle: string, id: string) =>
    changeTaskTitle(id, idList, newTaskTitle);
    
  const onChangeTodoListTitleHandler = (newTitle: string) => changeTodoListTitle(idList, newTitle);

  const onAllClickHandler = () => changeFilter(FilterType.ALL, idList);
  const onActiveClickHandler = () => changeFilter(FilterType.ACTIVE, idList);
  const onCompletedClickHandler = () => changeFilter(FilterType.COMPLETED, idList);
  const onRemoveClickHandler = () => {
    removeTodoList(idList);
  };

  const addNewTask = (title: string) => {
    addTask(title, idList);
  };

  const {
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodoList,
    changeTaskTitle,
    changeTodoListTitle,
    filter,
    idList,
  } = props;

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChange={(newTitle) => {
            onChangeTodoListTitleHandler(newTitle);
          }}
        />
        <button onClick={onRemoveClickHandler}>x</button>
      </h3>
      <AddItemForm addItem={addNewTask} />
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
              <EditableSpan
                title={title}
                onChange={(newTitle) => {
                  onChangeTitleHandler(newTitle, id);
                }}
              />
              <button
                onClick={() => {
                  removeTask(id, idList);
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
