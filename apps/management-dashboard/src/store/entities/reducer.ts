import { combineReducers } from 'redux';

import notificationsReducer from './notifications.entity';

const reducer = combineReducers({
  notifications: notificationsReducer,
});

export default reducer;
