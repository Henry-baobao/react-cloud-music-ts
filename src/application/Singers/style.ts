import styled from "styled-components";
import style from "../../assets/global-style";

type ListContainerProps = {
  play: number;
};

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

export const ListContainer = styled.div<ListContainerProps>`
  position: fixed;
  top: 160px;
  width: 100%;
  bottom: ${(props) => (props.play ? "60px" : 0)};
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`;

export const EnterLoading = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`