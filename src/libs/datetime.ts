import { ZonedDateTime, ZoneOffset } from '@js-joda/core';

export const getCurrentUTCDateTimeString = () => {
  const d2 = ZonedDateTime.now(ZoneOffset.UTC);
  return d2.toString();
};
