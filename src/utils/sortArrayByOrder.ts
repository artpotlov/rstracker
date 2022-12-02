export const sortArrayByOrder = <T extends { order: number }>(arr: T[]) => {
  arr.sort((a, b) => (a.order >= b.order ? 1 : -1));
  return arr;
};
