import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import Toast from './components/toast/toast';
import {store} from './store/index';
import {checkAuthAction, fetchFilmsAction} from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Toast />
      <App/>
    </Provider>
  </React.StrictMode>,
);
