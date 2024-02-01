import { useReducer } from 'react';
import { v1 } from 'uuid';

import { TodoList, TaskType } from './TodoList';
import { AddItemForm } from './AddItemForm';
import { FilterType } from './types/enums';
import './App.css';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';
import {
  addTodoListAC,
  changeTodoListFiltertAC,
  changeTodoListTitletAC,
  removeTodoListAC,
  todoListsReducer,
} from './state/todolists-reducer';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchToTodoListReducer] = useReducer(todoListsReducer, [
    { id: todoListId1, title: 'What to learn?', filter: FilterType.ALL },
    { id: todoListId2, title: 'What to buy?', filter: FilterType.ALL },
  ]);

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
    ],
  });

  function removeTodoList(todoListId: string) {
    dispatchToTodoListReducer(removeTodoListAC(todoListId));
    // setTasks({ ...tasks });
  }

  function changeFilter(filter: FilterType, todoListId: string) {
    dispatchToTodoListReducer(changeTodoListFiltertAC(todoListId, filter));
  }

  function changeTodoListTitle(todoListId: string, title: string) {
    dispatchToTodoListReducer(changeTodoListTitletAC(todoListId, title));
  }

  function addTodoList(title: string) {
    dispatchToTodoListReducer(addTodoListAC(title))
    // setTasks({ ...tasks, [todoList.id]: [] });
  }

  function removeTask(id: string, todoListId: string) {
    dispatchToTasksReducer(removeTaskAC(todoListId, id));
  }

  function addTask(taskTitle: string, todoListId: string) {
    dispatchToTasksReducer(addTaskAC(todoListId, taskTitle));
  }

  function changeTaskStatus(id: string, todoListId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(todoListId, id));
  }

  function changeTaskTitle(id: string, todoListId: string, title: string) {
    dispatchToTasksReducer(changeTaskTitleAC(todoListId, id, title));
  }

  return (
    <div className="App">
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} color={'inherit'}>
            <Menu />
          </IconButton>
          <Typography variant={'h6'} />
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={5}>
          {todoLists.map((todoList) => {
            let tasksForTodoList = tasks[todoList.id];
            switch (todoList.filter) {
              case FilterType.COMPLETED:
                tasksForTodoList = tasks[todoList.id].filter((task) => task.isDone === true);
                break;
              case FilterType.ACTIVE:
                tasksForTodoList = tasks[todoList.id].filter((task) => task.isDone === false);
                break;
              default:
                tasksForTodoList = tasks[todoList.id];
                break;
            }

            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    idList={todoList.id}
                    key={todoList.id}
                    title={todoList.title}
                    tasks={tasksForTodoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    removeTodoList={removeTodoList}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                    filter={todoList.filter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
