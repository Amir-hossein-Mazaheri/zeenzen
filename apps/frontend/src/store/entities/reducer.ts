import { combineReducers } from 'redux';

import filterReducer from './filter';
import userReducer from './user';

const reducer = combineReducers({
  filter: filterReducer,
  user: userReducer,
});

export default reducer;
