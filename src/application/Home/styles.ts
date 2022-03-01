import styled from "styled-components";
import style from "../../assets/global-style";

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style["theme-color"]};
  & > span {
    line-height: 40px;
    color: ${style["font-color-light"]};
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`;

export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${style["theme-color"]};

  a {
    font-size: 14px;
    color: ${style["border-color"]};
    &.underline {
      span {
        font-weight: 700;
        padding: 3px 0;
        color: ${style["font-color-light"]};
        border-bottom: 2px solid ${style["font-color-light"]};
      }
    }
  }
`;

export const TabItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
