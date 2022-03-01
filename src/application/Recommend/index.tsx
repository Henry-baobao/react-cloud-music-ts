import React from "react";
import Slider from "../../components/slider";
import RecommendList, { RecommendItem } from "../../components/list";
import { Content } from "./style";
import { forceCheck } from "react-lazyload";
import Scroll from "../../baseUI/scroll";

type Props = {
  bannerList: object[];
  recommendList: object[];
};

export default function Recommend(props: Props) {
  const { bannerList, recommendList} = props;
  //mock 数据
  // const bannerList = [1, 2, 3, 4].map((item) => {
  //   return {
  //     imageUrl:
  //       "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  //   };
  // });

  // const recommendListJS: RecommendItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  //   (item) => {
  //     return {
  //       id: item,
  //       picUrl:
  //         "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //       playCount: 17171122,
  //       name: "朴树、许巍、Henry-baobao",
  //     };
  //   }
  // );
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
