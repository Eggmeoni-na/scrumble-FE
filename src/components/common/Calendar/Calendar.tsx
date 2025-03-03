import { useDayStore } from '@/stores';
import { breakpoints, pcMediaQuery } from '@/styles/breakpoints';
import { fullSizeButtonStyle, scrollBarStyle } from '@/styles/globalStyles';
import { getDaysInMonth } from '@/utils';
import { css, Theme, useTheme } from '@emotion/react';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Calendar = ({ onChangeSelectedDay }: { onChangeSelectedDay: (day: string) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    onChangeSelectedDay(format(new Date(), 'yyyy-MM-dd'));
    setCurrentMonth(new Date());
  }, []);

  return (
    <section aria-labelledby="calendar">
      <h2 id="calendar" className="sr-only">
        캘린더
      </h2>
      <Calendar.Header currentMonth={currentMonth} onChangeCurrentMonth={setCurrentMonth} />
      <Calendar.List currentMonth={currentMonth} />
    </section>
  );
};

export default Calendar;

const CalendarHeader = ({
  currentMonth,
  onChangeCurrentMonth,
}: {
  currentMonth: Date;
  onChangeCurrentMonth: (month: Date) => void;
}) => {
  const handlePrevMonth = useCallback(() => {
    const prevMonth = subMonths(new Date(currentMonth), 1);
    onChangeCurrentMonth(prevMonth);
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = addMonths(new Date(currentMonth), 1);
    onChangeCurrentMonth(nextMonth);
  }, [currentMonth]);

  return (
    <div css={monthNavButtonStyle}>
      <button onClick={handlePrevMonth}>{'<'}</button>
      <span>{format(currentMonth, 'yyyy년 MM월')}</span>
      <button onClick={handleNextMonth}>{'>'}</button>
    </div>
  );
};

const CalendarList = ({ currentMonth }: { currentMonth: Date }) => {
  const selectedDayRef = useRef<HTMLLIElement>(null);
  const daysInCurrentMonth = useMemo(() => getDaysInMonth(new Date(currentMonth)), [currentMonth]);
  const selectedDay = useDayStore((state) => state.selectedDay);

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
    <>
      {daysInCurrentMonth.length > 0 && (
        <ul
          css={calendarStyle}
          tabIndex={0}
          role="listbox"
          aria-label="날짜 선택"
          aria-activedescendant={selectedDay ? `${selectedDay}일` : undefined}
        >
          {daysInCurrentMonth.map((day) => (
            <Calendar.Item key={day} day={day} ref={day === selectedDay ? selectedDayRef : null} />
          ))}
        </ul>
      )}
    </>
  );
};

Calendar.Item = forwardRef<HTMLLIElement, { day: string }>(({ day }, ref) => {
  const theme = useTheme();
  const { selectedDay, setSelectedDay } = useDayStore((state) => state);
  const isSelected = selectedDay === day;
  const isToday = format(new Date(), 'yyyy-MM-dd') === day;

  const handleClick = () => {
    if (!day || selectedDay === day) return;
    setSelectedDay(day);
  };

  return (
    <li
      key={day}
      css={[
        calendarItemStyle(theme, isSelected),
        isSelected && selectedDateStyle,
        isToday && todayStyle(theme, isSelected),
      ]}
      ref={ref}
      role="option"
      aria-selected={selectedDay === day}
      id={`${day}일`}
    >
      <button style={fullSizeButtonStyle} onClick={handleClick} css={calendarButtonStyle}>
        <span>{format(new Date(day), 'dd')}</span>
        <span css={dayNameStyle}>{format(new Date(day), 'EEE', { locale: ko })}</span>
      </button>
    </li>
  );
});

Calendar.Header = CalendarHeader;
Calendar.List = CalendarList;
Calendar.Item.displayName = 'CalendarItem';

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

const calendarButtonStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const todayStyle = (theme: Theme, isSelected: boolean) => css`
  color: ${isSelected ? 'white' : theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
`;

const selectedDateStyle = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};

  & button {
    color: #1b1b52;
  }
`;

const dayNameStyle = (theme: Theme) => css`
  ${theme.typography.size_10}
  font-weight: 500;
`;

const monthNavButtonStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${breakpoints.mobile};
  margin: 8px auto;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    ${theme.typography.size_14}
    font-weight: 500;
  }

  & button {
    width: 28px;
    height: 28px;
    border: 2px solid ${theme.colors.gray.gray100};
    border-radius: 4px;
    color: ${theme.colors.text};
    cursor: pointer;
    margin: 0 16px;

    transition: transform 0.3s ease-in-out;
    :hover {
      transform: scale(1.1);
      background-color: #eeeeee70;
    }
  }

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
    margin: 8px 150px;
  `)}
`;
