import { useTheme } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { addDays, eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  Circle,
  containerStyle,
  contentStyle,
  dayNumberStyle,
  headerStyle,
  monthViewStyle,
  navButtonStyle,
  navigationStyle,
  titleStyle,
  viewButtonStyle,
  viewSelectorStyle,
  weekDayContentCellStyle,
  weekDayHeaderCellStyle,
  weekendDayNumberStyle,
  weekGridStyle,
} from './style';

import { TODO_PAGE_SIZE } from '@/constants/todo';
import { todoInfiniteQueryOptions } from '@/hooks/queries';
import { useTodoProgressStore } from '@/stores/progressRete';
import { TodoQueryParams } from '@/types';

import ProgressRate from '@/components/ProgressRate';

type CalendarView = 'month' | 'week' | 'day';

interface CalendarComponentProps {
  onDateChange: (date: string) => void;
  selectedDate?: Date;
  queryParams: TodoQueryParams;
}

const viewOptions = ['day', 'week', 'month'];

const CalendarComponent = ({ onDateChange, selectedDate = new Date(), queryParams }: CalendarComponentProps) => {
  const [view, setView] = useState<CalendarView>('week');
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const theme = useTheme();

  const getProgress = useTodoProgressStore((s) => s.getProgress);

  const payload = {
    startDate: transformDate(selectedDate),
    endDate: transformDate(selectedDate),
    pageSize: TODO_PAGE_SIZE,
  };

  const { isFetching } = useInfiniteQuery(
    todoInfiniteQueryOptions(queryParams.squadMemberId, queryParams.squadId, queryParams.selectedDay, payload),
  );

  const handleNavigateDate = (direction: 'prev' | 'next') => {
    const step = direction === 'next' ? 1 : -1;
    let newDate;

    switch (view) {
      case 'day':
        newDate = addDays(currentDate, step);
        break;
      case 'week':
        newDate = addDays(currentDate, step * 7);
        break;
      case 'month':
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + step, 1);
        break;
      default:
        newDate = currentDate;
    }

    setCurrentDate(newDate);
    onDateChange(transformDate(newDate));
  };

  const handleDateChange = (value: unknown) => {
    const newDate = Array.isArray(value) ? value[0] : value;

    setCurrentDate(newDate);
    onDateChange(transformDate(newDate));
  };

  const renderMonthView = () => (
    <div css={monthViewStyle(theme)}>
      <Calendar onChange={handleDateChange} value={currentDate} tileClassName={tileClassName} />
    </div>
  );

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div css={weekGridStyle}>
        {weekDays.map((day) => {
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const weekendClass = dayOfWeek === 0 ? 'sunday' : dayOfWeek === 6 ? 'saturday' : '';

          return (
            <div key={day.toString()} css={weekDayHeaderCellStyle}>
              <div>{format(day, 'EEE', { locale: ko })}</div>
              <div
                css={[dayNumberStyle(isSameDay(day, currentDate)), isWeekend && weekendDayNumberStyle(weekendClass)]}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}

        {weekDays.map((day) => {
          const isSelectedDay = isSameDay(day, currentDate);
          const progressRate = getProgress(queryParams.squadMemberId, transformDate(day));

          return (
            <div
              key={day.toString()}
              css={weekDayContentCellStyle(isSameDay(day, currentDate), theme)}
              onClick={() => handleDateChange(day)}
              aria-disabled={isSelectedDay}
            >
              {isSelectedDay && !isFetching ? <ProgressRate percent={progressRate} /> : <Circle />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div css={containerStyle}>
      <div css={viewSelectorStyle}>
        {viewOptions.map((v) => (
          <button
            css={viewButtonStyle(view === v, theme)}
            onClick={() => setView(v as CalendarView)}
            disabled={view === v}
          >
            {v}
          </button>
        ))}
      </div>

      <div css={headerStyle}>
        <div css={navigationStyle}>
          <button css={navButtonStyle} onClick={() => handleNavigateDate('prev')}>
            ‹
          </button>
          <h2 css={titleStyle}>{getViewTitle(view, currentDate)}</h2>
          <button css={navButtonStyle} onClick={() => handleNavigateDate('next')}>
            ›
          </button>
        </div>
      </div>

      <div css={contentStyle}>
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
      </div>
    </div>
  );
};

export default CalendarComponent;

/**
 * 내부 유틸 함수
 */

// 주말 색상 구분 클래스
const tileClassName = ({ date }: { date: Date }) => {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return 'sunday';
  }
  if (dayOfWeek === 6) {
    return 'saturday';
  }
  return '';
};

const transformDate = (date: Date) => format(date, 'yyyy-MM-dd');

const getViewTitle = (view: CalendarView, currentDate: Date) => {
  switch (view) {
    case 'day':
      return format(currentDate, 'yyyy년 M월 d일', { locale: ko });
    case 'week':
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(weekStart, 'M월 d일', { locale: ko })} - ${format(weekEnd, 'M월 d일', { locale: ko })}`;
    case 'month':
      return format(currentDate, 'yyyy년 M월', { locale: ko });
    default:
      return '';
  }
};
