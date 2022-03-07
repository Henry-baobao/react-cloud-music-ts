import { Actions } from "./actionCreators";
import * as actionTypes from "./constants";

export interface State {
  bannerList: object[];
  recommendList: object[];
}

const defaultState: State = {
  bannerList: [],
  recommendList: [],
};

const reducer = (state: State = defaultState, action: Actions): State => {
  console.log("init reducer: ", state);
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return { ...state, bannerList: action.data };
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return { ...state, recommendList: action.data };
    default:
      return state;
  }
};

export default reducer;
