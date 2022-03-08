import styled from "styled-components";
import style from "../../assets/global-style";

export const ListWrapper = styled.div`
  max-width: 100%;
  padding: 0 6px;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 60px;
  }
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-around; */
`;

export const ListItem = styled.div`
  width: 32%;
  .img_wrapper {
    position: relative;
    //通过height和padding-bottom属性进行图片占位
    height: 0;
    padding-bottom: 100%;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      right: 4px;
      top: 4px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      border-radius: 6px;
    }
  }
  .desc {
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    line-height: 1.4;
    font-size: ${style["font-size-s"]};
    color: ${style["font-color-desc"]};
  }

  &:not(:nth-child(3n)) {
    margin-right: calc(4% / 3);
  }
`;
