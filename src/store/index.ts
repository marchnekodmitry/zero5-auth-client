import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import { AuthActions } from './actions/auth';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export type State = ReturnType<typeof rootReducer>;
export type Actions = AuthActions;

export default createStore(rootReducer, enhancer);
