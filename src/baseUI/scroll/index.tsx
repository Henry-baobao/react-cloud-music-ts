import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
import BScroll from "better-scroll";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { debounce } from "../../api/utils";
import Loading from "../loading";
import LoadingV2 from "../loadingV2";

type Direction = "vertical" | "horizontal";

type Props = {
  direction: Direction;
  click: boolean;
  refresh: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  bounceTop: boolean;
  bounceBottom: boolean;
  children: ReactNode;
  onScroll: (scroll: any) => void;
  pullUp: () => void;
  pullDown: () => void;
};

export interface IScrollRef {
  refresh: () => void;
  getBScroll: () => void;
}

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef<IScrollRef, Partial<Props>>((props, ref) => {
  const {
    direction,
    click,
    refresh,
    bounceTop,
    bounceBottom,
    pullUpLoading,
    pullDownLoading,
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState<BScrollConstructor | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp!, 1000);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown!, 1000);
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current!, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
      //启用observe-dom插件
      observeDOM: true,
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", onScroll);
    return () => {
      bScroll.off("scroll", onScroll);
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handlePullUp);
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, bScroll, pullUpDebounce]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos: any) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, bScroll, pullDownDebounce]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll: () => {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpDisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDownDisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDownDisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  refresh: true,
  click: true,
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
