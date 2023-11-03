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
  