import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Scroll from "../scroll";
import style from "../../assets/global-style";

type Props = {
  title?: string;
  selectedCategory?: string;
  list?: Item[];
  handleClick?: (key: string) => void;
};

export interface Item {
  key: string;
  name: string;
}

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: center;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: gray;
    font-size: ${style["font-size-m"]};
  }
`;

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`;

const HorizonItem = (props: Props) => {
  const { title, list, selectedCategory } = props;
  const { handleClick } = props;

  const categoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const categoryDom = categoryRef.current;
    if (!categoryDom) return;
    const tagElems = categoryDom?.querySelectorAll("span");
    let totalWidth: number = 0;
    tagElems?.forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDom.style.width = `${totalWidth}px`;
  }, []);

  const clickHandle = (item: Item) => {
    handleClick && handleClick(item.key);
  };

  return (
    <Scroll direction="horizontal" refresh>
      <List ref={categoryRef}>
        <span>{title}</span>
        {list?.map((item) => (
          <ListItem
            key={item.key}
            className={selectedCategory === item.key ? "selected" : ""}
            onClick={() => clickHandle(item)}
          >
            {item.name}
          </ListItem>
        ))}
      </List>
    </Scroll>
  );
};

export default HorizonItem;
