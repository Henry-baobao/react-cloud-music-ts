import styled from "styled-components";
import style from "../../assets/global-style";

type ContainerProps = {
  play: number;
};

type ListProps = {
  //代表是否为全球榜单
  globalRank: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  width: 100%;
  .official,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
`;

export const List = styled.ul<ListProps>`
  display: ${(props) => (props.globalRank ? "flex" : "")};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 5px;
  background-color: ${style["background-color"]};
  //保证flex布局时图片左对齐
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`;

export const ListItem = styled.li<ListProps>`
  padding: 3px 0;
  display: ${(props) => (props.globalRank ? "" : "flex")};
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    width: ${(props) => (props.globalRank ? "32vw" : "27vw")};
    height: ${(props) => (props.globalRank ? "32vw" : "27vw")};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
    }
    .update_frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`;

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  > li {
    font-size: ${style["font-size-s"]};
    color: gray;
  }
`;
