import React from "react";
import styled from "styled-components";
import style from "../../assets/global-style";

type Props = {
  title: string;
  handleClick: () => void;
};

export interface IHeaderRefProps extends HTMLDivElement {}

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  padding: 5px 10px;
  height: 50px;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  line-height: 40px;
  color: ${style["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  .detail {
    margin-left: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
    margin: auto;
  }
`;

const Header = React.forwardRef<IHeaderRefProps, Props>((props, ref) => {
  const { handleClick, title } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
      <i className="iconfont detail">&#xe606;</i>
    </HeaderContainer>
  );
});

export default Header;
