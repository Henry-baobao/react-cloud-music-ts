import { fromJS } from "immutable";
import { Actions } from "./actionCreators";
import * as actionTypes from "./constants";

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
}).toMap();

const reducer = (state = defaultState, action: Actions) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set("bannerList", action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", action.data);
    default:
      return state;
  }
};

export default reducer;
