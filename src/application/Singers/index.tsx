import React, { useEffect, useRef, useState } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import HorizonItem, { Item } from "../../baseUI/horizon-item";
import Loading from "../../baseUI/loading";
import Scroll, { IScrollRef } from "../../baseUI/scroll";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getHotSingersAsync,
  getSingersAsync,
  refreshHotSingersAsync,
  refreshSingersAsync,
  saveArea,
  saveCategory,
  saveInitial,
  saveType,
} from "./store/slice";
import {
  EnterLoading,
  List,
  ListContainer,
  ListItem,
  NavContainer,
} from "./style";

export interface Singer {
  accountId: number;
  picUrl: string;
  name: string;
}

type Props = {};
// 歌手种类
const categoryTypes: Item[] = [
  {
    name: "华语男",
    key: "7_1",
  },
  {
    name: "华语女",
    key: "7_2",
  },
  {
    name: "华语组合",
    key: "7_3",
  },
  {
    name: "欧美男",
    key: "96_1",
  },
  {
    name: "欧美女",
    key: "96_2",
  },
  {
    name: "欧美组合",
    key: "96_3",
  },
  {
    name: "日本男",
    key: "8_1",
  },
  {
    name: "日本女",
    key: "8_2",
  },
  {
    name: "日本组合",
    key: "8_3",
  },
  {
    name: "韩国男",
    key: "16_1",
  },
  {
    name: "韩国女",
    key: "16_2",
  },
  {
    name: "韩国组合",
    key: "16_3",
  },
  {
    name: "其他男歌手",
    key: "0_1",
  },
  {
    name: "其他女歌手",
    key: "0_2",
  },
  {
    name: "其他组合",
    key: "0_3",
  },
];

// 歌手首字母
const alphaTypes: Item[] = [
  {
    key: "A",
    name: "A",
  },
  {
    key: "B",
    name: "B",
  },
  {
    key: "C",
    name: "C",
  },
  {
    key: "D",
    name: "D",
  },
  {
    key: "E",
    name: "E",
  },
  {
    key: "F",
    name: "F",
  },
  {
    key: "G",
    name: "G",
  },
  {
    key: "H",
    name: "H",
  },
  {
    key: "I",
    name: "I",
  },
  {
    key: "J",
    name: "J",
  },
  {
    key: "K",
    name: "K",
  },
  {
    key: "L",
    name: "L",
  },
  {
    key: "M",
    name: "M",
  },
  {
    key: "N",
    name: "N",
  },
  {
    key: "O",
    name: "O",
  },
  {
    key: "P",
    name: "P",
  },
  {
    key: "Q",
    name: "Q",
  },
  {
    key: "R",
    name: "R",
  },
  {
    key: "S",
    name: "S",
  },
  {
    key: "T",
    name: "T",
  },
  {
    key: "U",
    name: "U",
  },
  {
    key: "V",
    name: "V",
  },
  {
    key: "W",
    name: "W",
  },
  {
    key: "X",
    name: "X",
  },
  {
    key: "Y",
    name: "Y",
  },
  {
    key: "Z",
    name: "Z",
  },
];

const Singers = (props: Props) => {
  const singerState = useAppSelector((state) => state.singer);
  const {
    category,
    singerList,
    initial,
    loading,
    pullUpLoading,
    pullDownLoading,
  } = singerState;
  const dispatch = useAppDispatch();
  const scrollRef = useRef<IScrollRef | null>(null);

  useEffect(() => {
    if (!singerList.length && !category && !initial) {
      dispatch(getHotSingersAsync());
    }
  }, [singerList, initial, dispatch, category]);

  const handleUpdateCategory = (val: string) => {
    if (category === val) return;
    //解析传入参数后设置查询参数
    const strArr = val.split("_");
    if (strArr.length < 2) return;
    const type = parseInt(strArr[1]);
    const area = parseInt(strArr[0]);
    dispatch(saveCategory(val));
    dispatch(saveType(type));
    dispatch(saveArea(area));
    dispatch(getSingersAsync());
    //通过定位置起始位置，防止进行refresh请求
    scrollRef.current?.refresh();
  };

  const handleUpdateAlpha = (val: string) => {
    if (initial === val) return;
    dispatch(saveInitial(val));
    dispatch(getSingersAsync());
    //通过定位置起始位置，防止进行refresh请求
    scrollRef.current?.refresh();
  };

  const handlePullUp = () => {
    if (category === "" && initial === "") {
      dispatch(refreshHotSingersAsync());
    } else {
      dispatch(refreshSingersAsync());
    }
  };

  const handlePullDown = () => {
    if (category === "" && initial === "") {
      dispatch(getHotSingersAsync());
    } else {
      dispatch(getSingersAsync());
    }
  };

  const renderSingerList = () => {
    const list = singerList as Singer[];
    return (
      <List>
        {list?.map((singer, index) => (
          <ListItem key={`${singer.accountId}_${index}`}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("./singer.png")}
                    alt="defaultSinger"
                  />
                }
              >
                <img
                  src={`${singer.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="singer"
                />
              </LazyLoad>
            </div>
            <span className="name">{singer.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <NavContainer>
        <HorizonItem
          list={categoryTypes}
          title="分类（默认热门）："
          selectedCategory={category}
          handleClick={handleUpdateCategory}
        />
        <HorizonItem
          list={alphaTypes}
          title="首字母："
          selectedCategory={initial}
          handleClick={handleUpdateAlpha}
        />
      </NavContainer>
      <ListContainer play={0}>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          ref={scrollRef}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {/* 入场加载动画 */}
      {loading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
    </>
  );
};

export default Singers;
