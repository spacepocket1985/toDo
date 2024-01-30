import { todoListsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import { TodoListType } from '../App';
import { FilterType } from '../types/enums';
import {
  RemoveTodoListAC,
  AddTodoListAC,
  ChangeTodoListTitletAC,
  ChangeTodoListFiltertAC,
} from './todolists-reducer';

test('correct todolist should be removed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: FilterType.ALL },
    {
      id: todoListId2,
      title: 'What to learn',
      filter: FilterType.ALL,
    },
  ];

  const action = RemoveTodoListAC(todoListId1);

  const endState = todoListsReducer(startState, action);

  if (endState) {
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
  }
});

test('correct todolist should be added', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTodoListTitle = 'newTodoList';

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: FilterType.ALL },
    {
      id: todoListId2,
      title: 'What to learn',
      filter: FilterType.ALL,
    },
  ];

  const action = AddTodoListAC(newTodoListTitle);

  const endState = todoListsReducer(startState, action);

  if (endState) {
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe(FilterType.ALL);
  }
});

test('correct todolist should change its name', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newTodoListTitle = 'newTodoList';

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: FilterType.ALL },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: FilterType.ALL,
    },
  ];

  const action = ChangeTodoListTitletAC(todoListId2, newTodoListTitle);

  const endState = todoListsReducer(startState, action);

  if (endState) {
    expect(endState[1].title).toBe(newTodoListTitle);
    expect(endState[0].title).toBe('What to learn');
  }
});

test('correct filter of todolist should be changed', () => {
  const todoListId1 = v1();
  const todoListId2 = v1();
  const newFilter = FilterType.COMPLETED;

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: FilterType.ALL },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: FilterType.ALL,
    },
  ];

  const action = ChangeTodoListFiltertAC(todoListId2, newFilter);

  const endState = todoListsReducer(startState, action);

  if (endState) {
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[0].filter).toBe(FilterType.ALL);
  }
});
