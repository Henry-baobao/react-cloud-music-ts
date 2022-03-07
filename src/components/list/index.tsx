import React from "react";
import LazyLoad from "react-lazyload";
import { getCount } from "../../api/utils";
import { List, ListItem, ListWrapper } from "./style";

export interface RecommendItem {
  id: number;
  picUrl: string;
  playCount: number;
  name: string;
}

type Props = {
  recommendList: RecommendItem[];
};

function RecommendList(props: Props): JSX.Element {
  const { recommendList } = props;
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map((item) => (
          <ListItem key={item.id}>
            <div className="img_wrapper">
              <div className="decorate"></div>
              <LazyLoad
                once
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("./music.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={item.picUrl + "?param=300*300"}
                  alt="music"
                  width="100%"
                  height="100%"
                />
              </LazyLoad>
              <div className="play_count">
                <i className="iconfont play">&#xe885;</i>
                <span className="count">{getCount(item.playCount)}</span>
              </div>
            </div>
            <div className="desc">{item.name}</div>
          </ListItem>
        ))}
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
