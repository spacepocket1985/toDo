import { TasksStateType } from '../App';
import { TaskType } from '../TodoList';
import { v1 } from 'uuid';
import { AddTodoListActionType, RemoveTodoListActionType } from './todolists-reducer';

export type ActionRemoveTaskType = {
  type: 'REMOVE-TASK';
  taskId: string;
  listId: string;
};

export type ActionAddTaskType = {
  type: 'ADD-TASK';
  listId: string;
  taskTitle: string; 
};

export type ActionChangeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  listId: string;
};

export type ActionChangeTaskTitleType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  tastitle: string;
  listId: string;
};

export type ActionsType =   
  | ActionRemoveTaskType
  | ActionAddTaskType
  | ActionChangeTaskStatusType
  | ActionChangeTaskTitleType
  | AddTodoListActionType
  | RemoveTodoListActionType

export const removeTaskAC = (listId: string, taskId: string): ActionRemoveTaskType => {
  return { type: 'REMOVE-TASK', listId, taskId };
};

export const addTaskAC = (listId: string, taskTitle: string): ActionAddTaskType => {
  return { type: 'ADD-TASK', listId, taskTitle };
};

export const changeTaskStatusAC = (listId: string, taskId: string): ActionChangeTaskStatusType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    listId,
    taskId,
  };
};

export const changeTaskTitleAC = (
  listId: string,
  taskId: string,
  tastitle: string
): ActionChangeTaskTitleType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    listId,
    taskId,
    tastitle,
  };
};

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.listId]: state[action.listId].filter((task) => task.id !== action.taskId),
      };
    case 'ADD-TASK': {
      const newTask: TaskType = { id: v1(), title: action.taskTitle, isDone: false };
      return { ...state, [action.listId]: [newTask, ...state[action.listId]] };
    }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.listId]: state[action.listId].map((task) =>
          task.id === action.taskId ? { ...task, isDone: !task.isDone } : task
        ),
      };

    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.listId]: state[action.listId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.tastitle } : task
        ),
      };
    case 'ADD-TODOLIST' : {
      const newList:TasksStateType = {[action.title]:[]} 
      return {...newList,...state}  
    }

    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id]
      return copyState
    }
      

    default:
      return state;
  }
};
