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

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
  return { type: 'REMOVE-TODOLIST', id: todoListId };
};

export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => {
  return { type: 'ADD-TODOLIST', title: todoListTitle };
};

export const ChangeTodoListTitletAC = (
  todoListId: string,
  todoListTitle: string
): ChangeTodoListTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: todoListTitle };
};

export const ChangeTodoListFiltertAC = (
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
): Array<TodoListType> | undefined => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((todoList) => todoList.id !== action.id);
    case 'ADD-TODOLIST':
      return [...state, { id: v1(), title: action.title, filter: FilterType.ALL }];
    case 'CHANGE-TODOLIST-TITLE': {
      const listForChange = state.find((list) => list.id === action.id);
      if (listForChange) {
        listForChange.title = action.title;
        return [...state, listForChange];
      }
      break;
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const listForChange = state.find((list) => list.id === action.id);
      if (listForChange) {
        listForChange.filter = action.filter;
        return [...state, listForChange];
      }
      break;
    }

    default:
      return state;
  }
};
