import { combineReducers } from 'redux';

import entitiesReducer from './entities/reducer';

const reducer = combineReducers({
  entities: entitiesReducer,
});

export default reducer;
