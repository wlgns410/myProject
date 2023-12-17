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

export const getPeriod = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    // If no startDate or endDate is provided, calculate period for the current day
    const now = dayjs();
    const startOfDay = now.startOf('day').toDate();
    const endOfDay = now.endOf('day').toDate();
    return {
      startOfDay,
      endOfDay,
    };
  } else {
    // If startDate and endDate are provided, convert them to Date objects
    const startOfDay = dayjs(startDate).startOf('day').toDate();
    const endOfDay = dayjs(endDate).endOf('day').toDate();
    return {
      startOfDay,
      endOfDay,
    };
  }
};
