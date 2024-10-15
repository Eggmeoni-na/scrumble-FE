import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';

export const getDaysInMonth = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({ start, end });
  return days.map((day) => format(day, 'yyyy-MM-dd'));
};
