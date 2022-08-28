import browserHistory from '../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../store/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'route/redirectToRoute') {
          browserHistory.push(action.payload);
        } else if (action.type === 'route/redirectToBack') {
          browserHistory.back();
        }

        return next(action);
      };
