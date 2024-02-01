import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AppWithRedux from './AppWithRedux';
import { store } from './state/store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);
