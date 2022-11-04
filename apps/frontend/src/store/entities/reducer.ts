import { combineReducers } from 'redux';

import filterReducer from './filter';
import courseReducer from './course';
import userReducer from './user';
import commentReducer from './comment';

const reducer = combineReducers({
  filter: filterReducer,
  course: courseReducer,
  user: userReducer,
  comment: commentReducer,
});

export default reducer;
