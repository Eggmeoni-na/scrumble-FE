import { pcMediaQuery } from '@/styles/breakpoints';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Circle = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px dashed #dfdfdf;
  overflow: hidden;
`;

export const containerStyle = css`
  width: 100%;
  padding: 0 16px;
`;

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const navigationStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const navButtonStyle = (theme: Theme) => css`
  border: 1.5px solid #ddd;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${theme.typography.size_24};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray.gray100};
  }
`;

export const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.typography.size_16};
  font-weight: 600;
  text-align: center;

  ${pcMediaQuery(css`
    font-size: ${theme.typography.size_24};
  `)}
`;

export const viewSelectorStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
`;

export const viewButtonStyle = (active: boolean, theme: Theme) => css`
  padding: 8px 16px;
  border: none;
  background: ${active ? theme.colors.background.yellow : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${active ? theme.colors.primary : theme.colors.gray.gray200};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.gray.gray100};
    color: ${theme.colors.gray.gray300};
  }

  &:disabled {
    pointer-events: none;
  }
`;

export const contentStyle = css`
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const monthViewStyle = (theme: Theme) => css`
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    background: ${theme.colors.background.calendar};
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__month-view__weekdays {
    background: ${theme.colors.background.calendar};
    padding: 15px 0;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 10px;
    font-weight: 600;
    color: #666;
    text-align: center;
    font-size: 14px;
  }

  .react-calendar__tile {
    padding: 8px 2px;
    border-radius: 16px;
    background: ${theme.colors.background.white};
    color: ${theme.colors.gray.gray300}; // 날짜
    ${theme.typography.size_14};
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background: ${theme.colors.gray.gray100};
    }

    ${pcMediaQuery(css`
      ${theme.typography.size_16};
      padding: 16px 2px;
    `)}
  }

  .react-calendar__tile--active {
    background: ${theme.colors.background.yellow} !important;
    color: ${theme.colors.primary} !important;
  }

  .react-calendar__tile--now {
    font-weight: 600;
    border: 1.5px solid ${theme.colors.primary} !important;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    padding: 4px;
  }

  .react-calendar__month-view__days__day {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #ccc;
  }

  .react-calendar__tile.saturday {
    color: #6560ff;
  }

  .react-calendar__tile.sunday {
    color: #ff8349;
  }
`;

export const dayNumberStyle = (selected: boolean) => css`
  font-size: 18px;
  font-weight: 600;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 50%;
  transition: all 0.2s ease;
`;

export const weekendDayNumberStyle = (weekendClass: string) => css`
  color: ${weekendClass === 'saturday' ? '#6560ff' : weekendClass === 'sunday' ? '#ff8349' : 'inherit'} !important;
`;

export const weekGridStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr; /* 첫 줄: 헤더 / 두번째 줄: 컨텐츠 */
  gap: 8px;
`;

export const weekDayHeaderCellStyle = css`
  text-align: center;
`;

export const weekDayContentCellStyle = (selected: boolean, theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border: 1.5px solid ${selected ? theme.colors.primary : '#e0e0e0'};
  border-radius: 16px;
  background: ${selected ? theme.colors.background.yellow : 'transparent'};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.gray.gray100};
  }

  &[aria-disabled='true'] {
    background: ${theme.colors.background.yellow};
    pointer-events: none;
  }
`;
