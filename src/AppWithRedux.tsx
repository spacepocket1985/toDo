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
import { useCallback } from 'react';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  console.log('App is called');

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todoLists);

  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks);

  const removeTodoList=useCallback((todoListId: string) =>{
    dispatch(removeTodoListAC(todoListId));
  },[])

  const changeFilter=useCallback((filter: FilterType, todoListId: string) =>{
    dispatch(changeTodoListFiltertAC(todoListId, filter))},[]);
  
  const changeTodoListTitle=useCallback((todoListId: string, title: string) =>{
    dispatch(changeTodoListTitletAC(todoListId, title))
  },[])

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListAC(title));
  }, []);

  const removeTask=useCallback((id: string, todoListId: string) =>{
    dispatch(removeTaskAC(todoListId, id))
  },[])

  const addTask=useCallback((taskTitle: string, todoListId: string) =>{
    dispatch(addTaskAC(todoListId, taskTitle))
  },[])

  const changeTaskStatus=useCallback((id: string, todoListId: string) =>{
    dispatch(changeTaskStatusAC(todoListId, id))
  },[])

  const changeTaskTitle=useCallback((id: string, todoListId: string, title: string) =>{
    dispatch(changeTaskTitleAC(todoListId, id, title))
  },[])

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
