import { subDays } from 'date-fns';

export const getDateRange = () => {
  const today = new Date();
  const startDateTime = subDays(today, 7);

  const formatForSSE = (date: Date) => {
    const utcDate = new Date(date.toISOString());
    utcDate.setHours(utcDate.getHours() + 9);
    return utcDate.toISOString();
  };

  return {
    startDateTime: formatForSSE(startDateTime),
    endDateTime: formatForSSE(today),
  };
};
