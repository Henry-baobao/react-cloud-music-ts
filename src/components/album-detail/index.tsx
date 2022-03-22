import React from "react";
import { Menu, TopDesc } from "../../application/Album/style";
import SongList, { SongItemProps } from "../../application/SongList";

type Props = {
  currentAlbum: AlbumItem;
  pullUpLoading: boolean;
};

export interface AlbumItem {
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  creator: Creator;
  tracks: SongItemProps[];
}

type Creator = {
  avatarUrl: string;
  nickname: string;
};

const AlbumDetail = (props: Props) => {
  const { currentAlbum, pullUpLoading } = props;

  const renderTopDesc = () => {
    return (
      <TopDesc url={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const renderSongList = () => {
    return (
      <SongList
        showBackground
        showCollect
        collectCount={currentAlbum.subscribedCount}
        loading={pullUpLoading}
        songs={currentAlbum.tracks}
      />
    );
  };

  return (
    <div>
      {renderTopDesc()}
      {renderMenu()}
      {renderSongList()}
    </div>
  );
};

export default AlbumDetail;
