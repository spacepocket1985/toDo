import { combineReducers, legacy_createStore as createStore } from 'redux';
import { todoListsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
});
export const store = createStore(rootReducer);
