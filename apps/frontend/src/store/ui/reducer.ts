import { combineReducers } from "redux";

import shopReducer from "./shop";

const reducer = combineReducers({
  shop: shopReducer,
});

export default reducer;
