import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store/index";

const reducers = combineReducers({
  recommend: recommendReducer,
});

export default reducers;
