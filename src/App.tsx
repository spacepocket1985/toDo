import { useState } from 'react';
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

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLIsts] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn?', filter: FilterType.ALL },
    { id: todoListId2, title: 'What to buy?', filter: FilterType.ALL },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
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
    setTodoLIsts(todoLists.filter((list) => list.id !== todoListId));

    delete tasks[todoListId];
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todoListId: string) {
    const filtredTasks = tasks[todoListId].filter((task) => task.id != id);
    tasks[todoListId] = filtredTasks;
    setTasks({ ...tasks });
  }

  function changeFilter(filter: FilterType, todoListId: string) {
    const todoList = todoLists.find((list) => list.id === todoListId);
    if (todoList) {
      todoList.filter = filter;
      setTodoLIsts([...todoLists]);
    }
  }

  function addTask(taskTitle: string, todoListId: string) {
    const newTask: TaskType = {
      id: v1(),
      title: taskTitle,
      isDone: false,
    };

    const newTasks = [newTask, ...tasks[todoListId]];
    tasks[todoListId] = newTasks;

    setTasks({ ...tasks });
  }

  function changeTaskStatus(id: string, todoListId: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      ),
    });
  }

  function changeTaskTitle(id: string, todoListId: string, title: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((task) =>
        task.id === id ? { ...task, title: title } : task
      ),
    });
  }

  function changeTodoListTitle(todoListId: string, title: string) {
    const todoList = todoLists.find((list) => list.id === todoListId);
    if (todoList) {
      todoList.title = title;
    }

    setTodoLIsts([...todoLists]);
  }

  function addTodoList(title: string) {
    const todoList: TodoListType = {
      id: v1(),
      title: title,
      filter: FilterType.ALL,
    };

    setTodoLIsts([todoList, ...todoLists]);
    setTasks({ ...tasks, [todoList.id]: [] });
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
        <Grid container style={{padding: "20px"}}>
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

export default App;
