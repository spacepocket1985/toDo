import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton } from '@mui/material';
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
        <IconButton aria-label="delete" onClick={onRemoveClickHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <div>
        {tasks.map((task) => {
          const { id, title, isDone } = task;
          return (
            <div key={id} className={isDone ? 'is-done' : ''}>
              <Checkbox
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
              <IconButton
                aria-label="delete"
                onClick={() => {
                  removeTask(id, idList);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={filter === FilterType.ALL ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          {FilterType.ALL}
        </Button>
        <Button
          color={'primary'}
          variant={filter === FilterType.ACTIVE ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          {FilterType.ACTIVE}
        </Button>
        <Button
          color={'secondary'}
          variant={filter === FilterType.COMPLETED ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          {FilterType.COMPLETED}
        </Button>
      </div>
    </div>
  );
}
