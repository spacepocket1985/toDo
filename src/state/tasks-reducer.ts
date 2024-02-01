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
  | RemoveTodoListActionType;

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

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TasksStateType = {
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
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
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
    case 'ADD-TODOLIST': {
      return { ...state, [action.listId]: [] };
    }

    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }

    default:
      return state;
  }
};
