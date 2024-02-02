import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
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

export const TodoList = React.memo((props: PropsType) => {
  console.log('TodoList is called');

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

  const onChangeTodoListTitleHandler = useCallback(
    (newTitle: string) => changeTodoListTitle(idList, newTitle),
    [changeTodoListTitle, idList]
  );

  const onAllClickHandler = useCallback(
    () => changeFilter(FilterType.ALL, idList),
    [changeFilter, idList]
  );
  const onActiveClickHandler = useCallback(
    () => changeFilter(FilterType.ACTIVE, idList),
    [changeFilter, idList]
  );
  const onCompletedClickHandler = useCallback(
    () => changeFilter(FilterType.COMPLETED, idList),
    [changeFilter, idList]
  );
  const onRemoveClickHandler = () => {
    removeTodoList(idList);
  };

  const addNewTask = useCallback(
    (title: string) => {
      addTask(title, idList);
    },
    [addTask, idList]
  );

  let tasksForTodoLists = tasks;
  switch (filter) {
    case FilterType.COMPLETED:
      tasksForTodoLists = tasks.filter((task) => task.isDone === true);
      break;
    case FilterType.ACTIVE:
      tasksForTodoLists = tasks.filter((task) => task.isDone === false);
      break;
    default:
      tasksForTodoLists = tasks;
  }

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
        {tasksForTodoLists
          ? tasksForTodoLists.map((task) => (
              <Task
                task={task}
                idList={idList}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
                key={task.id}
              />
            ))
          : null}
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
});

type TaskPropsType = {
  task: TaskType;
  idList: string;
  removeTask: (id: string, todoListId: string) => void;
  changeTaskTitle: (id: string, todoListId: string, title: string) => void;
  changeTaskStatus: (id: string, todoListId: string) => void;
};

const Task = React.memo((props: TaskPropsType) => {
  const {
    task: { id, title, isDone },
    idList,
    removeTask,
    changeTaskTitle,
    changeTaskStatus,
  } = props;

  const onChangeHandler = useCallback(
    (id: string) => {
      changeTaskStatus(id, idList);
    },
    [changeTaskStatus, idList]
  );

  const onChangeTitleHandler = useCallback(
    (newTaskTitle: string, id: string) => changeTaskTitle(id, idList, newTaskTitle),
    [changeTaskTitle, idList]
  );

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
});
