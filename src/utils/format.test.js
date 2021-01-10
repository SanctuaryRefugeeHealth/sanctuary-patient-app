import {
  formatDate,
  formatDatetime,
  formatPhoneNumber,
  formatTime,
} from "./format";

test("#formatDatetime should return correct format AM", () => {
  const actual = formatDatetime(new Date(2021, 0, 9, 11, 25)); // the month is 0-indexed
  const expected = "Sat, Jan 9, 2021 11:25 AM";

  expect(actual).toBe(expected);
});

test("#formatDatetime should return correct format PM", () => {
  const actual = formatDatetime(new Date(2021, 0, 9, 12, 25));
  const expected = "Sat, Jan 9, 2021 12:25 PM";

  expect(actual).toBe(expected);
});

test("#formatDate should return correct format", () => {
  const actual = formatDate(new Date(2021, 0, 9, 11, 25));
  const expected = "2021-01-09";

  expect(actual).toBe(expected);
});

test("#formattime should return correct format", () => {
  const actual = formatTime(new Date(2021, 0, 9, 12, 25));
  const expected = "12:25";

  expect(actual).toBe(expected);
});

test("#formattime should return correct format 24h", () => {
  const actual = formatTime(new Date(2021, 0, 9, 13, 25));
  const expected = "13:25";

  expect(actual).toBe(expected);
});

test("#formatPhoneNumber should return correct format", () => {
  const actual = formatPhoneNumber("5198675309");
  const expected = "+1 (519) 867-5309";

  expect(actual).toBe(expected);
});
