import { tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../App';
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import { addTodoListAC, removeTodoListAC } from './todolists-reducer';
import { v1 } from 'uuid';

test('correct todolist task should be removed', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'Rest API', isDone: false },
      { id: '4', title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Beer', isDone: false },
    ],
  };

  const action = removeTaskAC('todoListId2', '2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(4);
  expect(endState['todoListId2'].length).toBe(2);
  expect(endState['todoListId2'].every((task) => task.id !== '2')).toBeTruthy();
});

test('correct todolist task should be added', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Beer', isDone: false },
    ],
  };

  const action = addTaskAC('todoListId1', 'Angular');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId1'][0].id).toBeDefined();
  expect(endState['todoListId2'].length).toBe(3);
  expect(endState['todoListId1'].find((task) => task.title !== 'Angular')).toBeTruthy();
});

test('should change the task status correctly', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'Rest API', isDone: false },
      { id: '4', title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Beer', isDone: false },
    ],
  };

  const action = changeTaskStatusAC('todoListId2', '2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'][1].isDone).toBeFalsy;
  expect(endState['todoListId1'][0].isDone).toBeTruthy;
});

test('should change the task title correctly', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'Rest API', isDone: false },
      { id: '4', title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Beer', isDone: false },
    ],
  };

  const action = changeTaskTitleAC('todoListId1', '2', 'Acyns');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'][1].isDone).toBeFalsy;
  expect(endState['todoListId1'][1].title).toBe('Acyns');
});

test('should properly add a new list', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'Rest API', isDone: false },
      { id: '4', title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Beer', isDone: false },
    ],
  };

  const action = addTodoListAC('newList');

  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(endState['newList1']).toBeDefined;
  expect(keys.length).toBe(3);
});

test('should correctly remove list', () => {
  const startState: TasksStateType = {
    ['todoListId1']: [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'Rest API', isDone: false },
      { id: '4', title: 'GraphQL', isDone: false },
    ],
    ['todoListId2']: [
      { id: '1', title: 'Book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Beer', isDone: false },
    ],
  };

  const action = removeTodoListAC('todoListId2');

  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todoListId2']).toBeUndefined();
});
