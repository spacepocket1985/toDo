import { userReducer, StateType} from './user-reducer';

test('user reducer should increment only age', () => {
  const startState: StateType = {
    age: 38,
    childrenCount: 0,
    name: 'Alex',
  };

  const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

  expect(endState.age).toBe(39);
  expect(endState.childrenCount).toBe(0);
});

test('user reducer should increment only childrenCount', () => {
  const startState: StateType = {
    age: 38,
    childrenCount: 0,
    name: 'Alex',
  };

  const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' });

  expect(endState.childrenCount).toBe(1);
});

test('user reducer should change name of user', () => {
  const startState: StateType = {
    age: 38,
    childrenCount: 0,
    name: 'Alex',
  };

  const newNAme = 'Timon';

  const endState = userReducer(startState, { type: 'CHANGE-NAME', payload: newNAme });

  expect(endState.name).toBe(newNAme);
});
