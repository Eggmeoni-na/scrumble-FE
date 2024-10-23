import { useDayStore } from '@/stores';
import { scrollBarStyle } from '@/styles/globalStyles';
import { getDaysInMonth } from '@/utils/getDaysInMonth';
import { css, Theme, useTheme } from '@emotion/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { forwardRef, memo, MouseEvent, useEffect, useMemo, useRef } from 'react';

type Props = {
  selectedDay: string;
  onSelectDay: (date: string) => void;
  currentMonth: Date;
};

const CalendarList = ({ selectedDay, onSelectDay, currentMonth }: Props) => {
  const daysContainerRef = useRef<HTMLUListElement>(null);
  const selectedDayRef = useRef<HTMLLIElement>(null);
  const daysInCurrentMonth = useMemo(() => getDaysInMonth(new Date(currentMonth)), [currentMonth]);

  const handleClick = (e: MouseEvent<HTMLUListElement>) => {
    const target = (e.target as HTMLElement).closest('li');
    if (target && target instanceof HTMLLIElement) {
      const day = target.dataset.day;
      if (selectedDay === day) return;
      if (day) {
        onSelectDay(day);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }
  };

  useEffect(() => {
    if (selectedDayRef.current) {
      selectedDayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedDay]);

  return (
    <ul css={calendarStyle} onClick={handleClick} ref={daysContainerRef}>
      {daysInCurrentMonth.map((day) => (
        <CalendarItem key={day} day={day} ref={day === selectedDay ? selectedDayRef : null} />
      ))}
    </ul>
  );
};

export default memo(CalendarList);

const CalendarItem = forwardRef<HTMLLIElement, { day: string }>(({ day }, ref) => {
  const theme = useTheme();
  const selectedDay = useDayStore((state) => state.selectedDay);
  const isSelected = selectedDay === day;
  const isToday = format(new Date(), 'yyyy-MM-dd') === day;
  return (
    <li
      key={day}
      css={[
        calendarItemStyle(theme, isSelected),
        isSelected && selectedDateStyle,
        isToday && todayStyle(theme, isSelected),
      ]}
      data-day={day}
      ref={ref}
    >
      <span>{format(new Date(day), 'dd')}</span>
      <span css={dayNameStyle}>{format(new Date(day), 'EEE', { locale: ko })}</span>
    </li>
  );
});

const calendarStyle = css`
  display: flex;
  gap: 4px;
  margin: 8px 16px;
  overflow-x: auto;

  ${scrollBarStyle}
`;

const calendarItemStyle = (theme: Theme, isSelected: boolean) => css`
  width: 32px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 14px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.background.white};
  border: 2px solid ${theme.colors.gray.gray100};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${!isSelected && theme.colors.background.yellow};
    cursor: ${isSelected && 'default'};
  }
`;

const todayStyle = (theme: Theme, isSelected: boolean) => css`
  color: ${isSelected ? 'white' : theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
`;

const selectedDateStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  color: white;
`;

const dayNameStyle = (theme: Theme) => css`
  ${theme.typography.size_10}
  font-weight: 500;
`;
