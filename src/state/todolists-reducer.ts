import { TodoListType } from '../App';
import { v1 } from 'uuid';
import { FilterType } from '../types/enums';

export type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodoListActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  listId: string;
};

export type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  title: string;
  id: string;
};

export type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
  return { type: 'REMOVE-TODOLIST', id: todoListId };
};

export const addTodoListAC = (todoListTitle: string): AddTodoListActionType => {
  return { type: 'ADD-TODOLIST', title: todoListTitle, listId: v1() };
};

export const changeTodoListTitletAC = (
  todoListId: string,
  todoListTitle: string
): ChangeTodoListTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: todoListTitle };
};

export const changeTodoListFiltertAC = (
  todoListId: string,
  todoListFilter: FilterType
): ChangeTodoListFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: todoListFilter };
};

export type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export const todoListsReducer = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((todoList) => todoList.id !== action.id);
    case 'ADD-TODOLIST':
      return [...state, { id: v1(), title: action.title, filter: FilterType.ALL }];
    case 'CHANGE-TODOLIST-TITLE': 
      return state.map((list) => (list.id === action.id ? { ...list, title: action.title } : list));
    case 'CHANGE-TODOLIST-FILTER': 
      return state.map((list) => (list.id === action.id ? { ...list, title: action.filter } : list));
    default:
      return state;
  }
};
