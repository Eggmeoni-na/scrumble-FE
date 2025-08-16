import { TodoList } from '@/components/Todo';
import { pcMediaQuery } from '@/styles/breakpoints';
import { ellipsisStyle } from '@/styles/globalStyles';
import { TodoQueryParams } from '@/types';
import { css, Theme } from '@emotion/react';
import { useState } from 'react';

type Props = {
  isMeSelected: boolean;
  selectedMemberName: string | undefined;
  queryParams: TodoQueryParams;
};

const Container = ({ isMeSelected, selectedMemberName, queryParams }: Props) => {
  const { selectedDay } = queryParams;
  const [progressRate, setProgressRate] = useState(0);

  return (
    <>
      <header css={headerStyle}>
        <span style={{ width: '90px' }}>{selectedDay}</span>
        <span
          css={ellipsisStyle}
          style={{
            width: '112px',
          }}
        >
          {selectedMemberName}
        </span>
        <span css={completionRateStyle}>달성률: {progressRate}%</span>
      </header>
      <TodoList isMeSelected={isMeSelected} onChangeProgressRate={setProgressRate} queryParams={queryParams} />
    </>
  );
};

export default Container;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 24px 12px 32px;
  ${theme.typography.size_14}
  font-weight: 500;

  ${pcMediaQuery(css`
    ${theme.typography.size_16}
  `)}
`;

const completionRateStyle = css`
  width: 90px;
  text-align: right;
`;
