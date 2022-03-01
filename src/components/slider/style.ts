import styled from "styled-components";
import style from "../../assets/global-style";

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${style["theme-color"]};
  }
  .slider-container {
    width: 98%;
    margin: auto;
    height: 160px;
    border-radius: 6px;
    overflow: hidden;
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination-bullet-active {
    background: ${style["theme-color"]};
  }
`;
