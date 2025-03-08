import {
  calendarButtonStyle,
  calendarItemStyle,
  calendarStyle,
  dayNameStyle,
  monthNavButtonStyle,
  selectedDateStyle,
  todayStyle,
} from '@/components/common/Calendar/style';
import { useDayStore } from '@/stores';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { getDaysInMonth } from '@/utils';
import { useTheme } from '@emotion/react';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

export default memo(Calendar);

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

const CalendarItem = forwardRef<HTMLLIElement, { day: string }>(({ day }, ref) => {
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

CalendarItem.displayName = 'CalendarItem';

Calendar.Header = CalendarHeader;
Calendar.List = CalendarList;
Calendar.Item = memo(CalendarItem);
