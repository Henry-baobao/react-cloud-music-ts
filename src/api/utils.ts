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
