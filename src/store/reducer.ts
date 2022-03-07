// import { combineReducers } from "redux-immutable";
import { combineReducers } from "redux";
import { reducer as recommendReducer } from "../application/Recommend/store/index";

const reducers = combineReducers({
  recommend: recommendReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
