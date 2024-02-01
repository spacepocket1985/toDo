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

} from './state/tasks-reducer';
import {
  addTodoListAC,
  changeTodoListFiltertAC,
  changeTodoListTitletAC,
  removeTodoListAC,
} from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todoLists);

  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks);

  function removeTodoList(todoListId: string) {
    dispatch(removeTodoListAC(todoListId));
  }

  function changeFilter(filter: FilterType, todoListId: string) {
    dispatch(changeTodoListFiltertAC(todoListId, filter));
  }

  function changeTodoListTitle(todoListId: string, title: string) {
    dispatch(changeTodoListTitletAC(todoListId, title));
  }

  function addTodoList(title: string) {
    dispatch(addTodoListAC(title));
  }

  function removeTask(id: string, todoListId: string) {
    dispatch(removeTaskAC(todoListId, id));
  }

  function addTask(taskTitle: string, todoListId: string) {
    dispatch(addTaskAC(todoListId, taskTitle));
  }

  function changeTaskStatus(id: string, todoListId: string) {
    dispatch(changeTaskStatusAC(todoListId, id));
  }

  function changeTaskTitle(id: string, todoListId: string, title: string) {
    dispatch(changeTaskTitleAC(todoListId, id, title));
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
              <Grid item key={todoList.id}>
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

export default AppWithRedux;
