import React, { useEffect } from "react";
import { filterIndex } from "../../api/utils";
import LoadingV2 from "../../baseUI/loadingV2";
import Scroll from "../../baseUI/scroll";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { EnterLoading } from "../Singers/style";
import { getRankListAsync } from "./store/slice";
import { List, SongList, ListItem, Container } from "./style";

type Props = {};

type SongProps = {
  first: string;
  second: string;
};

export interface IRankListProps {
  coverImgId: number;
  coverImgUrl: string;
  updateFrequency: string;
  tracks?: SongProps[];
}

const Rank = (props: Props) => {
  const rank = useAppSelector((state) => state.rank);
  const { rankList, loading } = rank;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRankListAsync());
  }, [dispatch]);

  const renderSongList = (list: SongProps[] | undefined) => {
    return list?.length ? (
      <SongList>
        {list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        ))}
      </SongList>
    ) : (
      <></>
    );
  };

  const renderRankList = (
    list: IRankListProps[],
    isGlobal: boolean = false
  ) => {
    return (
      <List globalRank={isGlobal}>
        {list?.map((item, index) => (
          <ListItem globalRank={isGlobal} key={`${item.coverImgId}${index}`}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="type" />
              <div className="decorate"></div>
              <span className="update_frequency">{item.updateFrequency}</span>
            </div>
            {renderSongList(item.tracks)}
          </ListItem>
        ))}
      </List>
    );
  };

  const displayStyle = loading ? { display: "none" } : { display: "" };
  const index = filterIndex(rankList as IRankListProps[]);
  const officialList = rankList.slice(0, index);
  const globalList = rankList.slice(index, rankList.length);

  return (
    <Container play={0}>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList as IRankListProps[])}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList as IRankListProps[], true)}
          {loading ? (
            <EnterLoading>
              <LoadingV2></LoadingV2>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
    </Container>
  );
};

export default Rank;
