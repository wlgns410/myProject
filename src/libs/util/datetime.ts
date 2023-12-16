import dayjs from 'dayjs';

export const getCurrentUTCDateTimeString = () => {
  const day = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
  return day;
};

export const getMonthStartDateEndDate = () => {
  const currentDate = dayjs();
  const monthStartDate = currentDate.startOf('month').format('YYYY-MM-DD HH:mm:ss');
  const monthEndDate = currentDate.endOf('month').format('YYYY-MM-DD HH:mm:ss');
  return {
    startDate: monthStartDate,
    endDate: monthEndDate,
  };
};

export const getDay = () => {
  const now = dayjs();

  // Set the start time of the day to 00:00:00, Date type
  const startOfDay = now.startOf('day').toDate();

  // Set the end time of the day to 23:59:59, Date type
  const endOfDay = now.endOf('day').toDate();
  return {
    startOfDay,
    endOfDay,
  };
};
