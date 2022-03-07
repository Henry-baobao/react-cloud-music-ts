import React, { useEffect } from "react";
import Slider, { Banner } from "../../components/slider";
import RecommendList, { RecommendItem } from "../../components/list";
import { Content } from "./style";
import { forceCheck } from "react-lazyload";
import Scroll from "../../baseUI/scroll";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "./store/actionCreators";
import { RootState } from "../../store/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

type Props = {
  bannerList: Banner[];
  recommendList: RecommendItem[];
};

const connector = connect(
  (state: RootState): Props => {
    console.log("root state: ", state);
    return {
      bannerList: state.recommend.bannerList as Banner[],
      recommendList: state.recommend.recommendList as RecommendItem[],
    };
  },
  (dispatch: ThunkDispatch<RootState, void, Action>) => ({
    getBannerDataDispatch: () => dispatch(actions.getBannerList()),
    getRecommendDataDispatch: () => dispatch(actions.getRecommendList()),
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Recommend(props: PropsFromRedux) {
  const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendDataDispatch } = props;
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendDataDispatch();
  }, []);
  
  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  );
}

export default connector(Recommend);
