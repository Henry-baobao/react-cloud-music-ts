import React, { useEffect, useState } from "react";
import { ONE_PAGE_COUNT } from "../../api/config";
import { getName } from "../../api/utils";
import { SongContainer, SongItem } from "./style";

type Props = {
  showBackground: boolean;
  showCollect: boolean;
  collectCount: number;
  loading: boolean;
  usePageSplit?: boolean;
  songs: SongItemProps[];
};
interface RefProps extends HTMLDivElement {}

type ArtistProps = {
  id: number;
  name: string;
};

type AlbumProps = {
  id: number;
  name: string;
  picUrl: string;
};

export interface SongItemProps {
  id: number;
  name: string;
  artists?: ArtistProps[];
  ar?: ArtistProps[];
  al?: AlbumProps;
  album?: AlbumProps;
}

const SongsList = React.forwardRef<RefProps, Props>((props, ref) => {
  const {
    showBackground,
    songs,
    showCollect,
    collectCount,
    usePageSplit,
    loading,
  } = props;

  const totalCount = songs.length;

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;
    if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return;
    setStartIndex(startIndex + ONE_PAGE_COUNT);
  }, [loading, startIndex, totalCount]);

  const selectItem = (e: React.MouseEvent<HTMLElement>, index: number) => {};

  const collect = (count: number) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    );
  };

  const songList = (list: SongItemProps[]) => {
    let res = [];
    // 判断页数是否超过总数
    let end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length;
    for (let i = 0; i < end; i++) {
      if (i >= list.length) break;
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists!)} -{" "}
              {item.al ? item.al.name : item.album?.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };

  return (
    <SongContainer ref={ref} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共{songs.length}首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongContainer>
  );
});

export default SongsList;
