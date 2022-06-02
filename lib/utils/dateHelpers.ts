export const dateToPuzzleId = (myDate: Date): string => {
  const m = padNum(myDate.getMonth() + 1, "00");
  const d = padNum(myDate.getDate(), "00");
  const y = myDate.getFullYear();
  return `${m}-${d}-${y}`;
};

export const puzzleIdToDate = (puzzleId: string): Date => {
  const [m, d, y] = puzzleId.split("-");
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
};

export const padNum = (num: number, pad: string): string => {
  var str = "" + num;
  return pad.substring(0, pad.length - str.length) + str;
};

export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const updateDateMonth = (currDate: Date, monthIndex: number): Date => {
  const d = currDate;
  d.setMonth(monthIndex);
  return d;
};
