export const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
export const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const DAY_ZERO = new Date(2022, 5, 1);
export const TODAY = new Date();
export const PREMIUM_DAY_ZERO = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate() - 3
);
