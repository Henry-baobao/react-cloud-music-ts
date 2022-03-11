import { IRankListProps } from "../application/Rank";

export const getCount = (count: number): number | string | undefined => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 10000) + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

export const debounce = (func: Function, delay: number) => {
  type TimeOutType = ReturnType<typeof setTimeout>;
  let timeId: TimeOutType;

  return (...args: any[]) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

//处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: IRankListProps[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks?.length && !rankList[i + 1].tracks?.length) {
      return i + 1;
    }
  }
  return rankList.length;
};
