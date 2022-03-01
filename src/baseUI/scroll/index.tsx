import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
import BScroll from "better-scroll";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

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

const Scroll = forwardRef<IScrollRef, Partial<Props>>((props, ref) => {
  const { direction, click, refresh, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState<BScrollConstructor | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    bScroll.on("scroll", (scroll: any) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", (pos: any) => {
      console.log("touch end position: ", pos);
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

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

  return (
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
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
