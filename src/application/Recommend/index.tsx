import React, { useEffect } from "react";
import Slider, { Banner } from "../../components/slider";
import RecommendList, { RecommendItem } from "../../components/list";
import { Content } from "./style";
import { forceCheck } from "react-lazyload";
import Scroll from "../../baseUI/scroll";
import { getBannerListAsync, getRecommendListAsync } from "./store/slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import LoadingV2 from "../../baseUI/loadingV2";

type Props = {};

export default function Recommend(props: Props) {
  const bannerList = useAppSelector((state) => state.recommend.bannerList);
  const recommendList = useAppSelector(
    (state) => state.recommend.recommendList
  );
  const loading = useAppSelector((state) => state.recommend.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerListAsync(0));
    }
    if (!recommendList.length) {
      dispatch(getRecommendListAsync(50));
    }
  }, []);

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList as Banner[]} />
          <RecommendList recommendList={recommendList as RecommendItem[]} />
        </div>
      </Scroll>
      {loading ? <LoadingV2 /> : <></>}
    </Content>
  );
}
