import { Add } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import IconWrapper from '@/components/common/IconWrapper';
import SquadDetailMemberList from '@/components/common/Member/SquadDetailMemberList';
import TodoList from '@/components/common/Todo/TodoList';
import { TODO_STATUS } from '@/constants/todo';
import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';
import { todoQueryOptions } from '@/hooks/queries/useTodo';
import useUserCookie from '@/hooks/useUserCookie';
import { useTodoStore } from '@/stores/todo';
import { scrollBarStyle } from '@/styles/globalStyles';
import { formatDate } from '@/utils/formatDate';
import { css, Theme } from '@emotion/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SquadDetailPage = () => {
  const params = useParams();
  const squadId = Number(params.squadId);
  const { user } = useUserCookie();
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  // TODO: 오늘 날짜를 기본값으로 캘린더 선택에 따라 refetch
  // lastToDoId 계산
  const queryParams = {
    startDate: currentDate,
    endDate: currentDate,
    lastToDoId: 30,
    pageSize: 30,
  };
  const [{ data: squadDetail }, { data: todos }] = useSuspenseQueries({
    queries: [
      {
        ...squadDetailQueryOptions(Number(squadId)),
        staleTime: 300000,
      },
      {
        ...todoQueryOptions({ squadId, memberId: user!.id, queryParams }),
      },
    ],
  });

  // TODO: 수정 API와 함께 개선 필요
  const isTodoChanged = useTodoStore((state) => state.isTodoChanged);
  const [progressRate, setProgressRate] = useState(0);
  const todoCount = todos.data.length;

  useEffect(() => {
    let isCompleted = 0;
    todos.data.forEach((todo) => todo.todoStatus === TODO_STATUS.COMPLETED && isCompleted++);

    setProgressRate(!todoCount ? 0 : Math.floor((isCompleted / todoCount) * 100));
  }, [todos]);

  return (
    <div css={containerStyle}>
      <section aria-labelledby="calendar">
        <h2 id="calendar" className="sr-only">
          캘린더
        </h2>
        <ul css={calendarStyle}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 29, 31].map((v) => (
            <li key={v} css={calendarItemStyle}>
              {v}
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="squad-members">
        <h2 id="squad-members" className="sr-only">
          멤버
        </h2>
        <SquadDetailMemberList squadMembers={squadDetail.data.squadMembers} />
      </section>
      <div css={headerStyle}>
        <span>달성률: {progressRate}%</span>
        <Button text="저장" variant="confirm" css={[saveButtonStyle(isTodoChanged)]} />
      </div>
      <TodoList todos={todos.data} />
      <form css={formStyle}>
        <input type="text" />
        <IconWrapper
          css={addIconStyle}
          onClick={() => {
            // TODO: 투두 등록 API 연동
          }}
        >
          <Add />
        </IconWrapper>
      </form>
    </div>
  );
};

export default SquadDetailPage;

const containerStyle = (them: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${them.colors.background.white};
`;

const calendarStyle = css`
  display: flex;
  gap: 4px;
  margin: 8px 16px;
  overflow-x: auto;

  ${scrollBarStyle}
`;

const calendarItemStyle = (theme: Theme) => css`
  width: 32px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 14px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.background.white};
  border: 2px solid ${theme.colors.gray.gray100};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 24px 12px 32px;
  ${theme.typography.size_16}
`;

const saveButtonStyle = (isTodoChanged: boolean) => css`
  width: 72px;
  height: 28px;
  opacity: ${isTodoChanged ? 1 : 0.3};
`;

const formStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.gray};
  border-radius: 12px;
  margin: 16px;

  & input {
    height: 40px;
    flex: 1;
    padding-left: 16px;
  }
`;

const addIconStyle = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.secondary};
  border-radius: 50%;
  margin-right: 8px;

  & svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;
