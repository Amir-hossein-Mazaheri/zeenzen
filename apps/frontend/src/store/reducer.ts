import { combineReducers } from "redux";

import uiReducer from "./ui/shop";
import entitiesReducer from "./entities/reducer";

const reducer = combineReducers({
  ui: uiReducer,
  entities: entitiesReducer,
});

export default reducer;
