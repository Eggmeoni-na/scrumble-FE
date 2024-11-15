import { Check, Close } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import IconWrapper from '@/components/common/IconWrapper';
import { Overlay } from '@/components/common/Overlay';
import { commonButtonStyle, headerStyle, sidebarContainer } from '@/components/common/Sidebar';
import { css, Theme } from '@emotion/react';
import { MouseEvent, useState } from 'react';

type Notification = {
  id: number;
  type: string | null;
  content: string;
  isRead: boolean;
};

const mockData: Notification[] = [
  {
    id: 1,
    type: 'INVITING',
    content: '✉️ ㅇㅇㅇㅇㅇㅇㅇㅇㅇ스쿼드에서 초대장이 도착했어요',
    isRead: false,
  },
  {
    id: 2,
    type: null,
    content: '수신자님을 스쿼드에 초대했어요',
    isRead: false,
  },
];

const Notifications = ({ toggleOpen }: { toggleOpen: VoidFunction }) => {
  const [isRead, setIsRead] = useState(false);
  const [isAccept, setIsAccept] = useState(false);

  const handleClose = () => toggleOpen();

  const handleReadStatus = (e: MouseEvent<HTMLLIElement>) => {
    // TODO: 읽음 처리 POST 요청
    if (isRead) return;
    setIsRead(!isRead);
  };

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: 수락 API 연동
    console.log('수락');
    setIsAccept(true);
  };

  return (
    <Overlay
      style={{
        justifyContent: 'flex-end',
      }}
      role="dialog"
      preventClick={false}
      onClick={handleClose}
    >
      <div css={sidebarContainer} onClick={(e) => e.stopPropagation()}>
        <header css={headerStyle}>
          <h1>알림</h1>
          <IconWrapper aria-label="Close sidebar" onClick={handleClose} role="button" css={commonButtonStyle}>
            <Close />
          </IconWrapper>
        </header>
        <Notifications.List />
      </div>
    </Overlay>
  );
};

export default Notifications;

Notifications.List = () => {
  return (
    <ul css={listStyle}>
      {mockData.map((data) => (
        <Notifications.Item key={data.id} data={data} />
      ))}
    </ul>
  );
};

Notifications.Item = ({ data }: { data: Notification }) => {
  const [isRead, setIsRead] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const { content, type } = data;

  const handleReadStatus = (e: MouseEvent<HTMLLIElement>) => {
    // TODO: 읽음 처리 POST 요청
    if (isRead) return;
    setIsRead(!isRead);
  };

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: 수락 API 연동 - 수락 성공 시 setIsAccept 업데이트
    setIsAccept(true);
  };

  return (
    <li css={[itemStyle, markStyle(isRead)]} onClick={handleReadStatus}>
      <p>{content}</p>
      {type === 'INVITING' && (
        <>
          {!isAccept ? (
            <Button text="수락" variant="primary" onClick={handleAccept} css={[isAccept && buttonStyle]} />
          ) : (
            <IconWrapper css={acceptIconStyle} onClick={(e) => e.stopPropagation()}>
              <Check style={checkIconStyle} />
            </IconWrapper>
          )}
        </>
      )}
    </li>
  );
};

const listStyle = css`
  margin-top: 24px;
`;

const itemStyle = (theme: Theme) => css`
  height: 56px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  ${theme.typography.size_14}
  font-weight: 400;
  flex: 2;

  & p {
    width: 190px;
    margin-right: 8px;
  }

  & button {
    width: 56px;
  }

  :hover {
    background-color: #e2e2e250;
    cursor: pointer;
  }
`;

const markStyle = (isRead: boolean) => css`
  ::before {
    opacity: ${isRead && 0};
    content: '';
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    margin-top: -24px;
    margin-right: 8px;
  }
`;

const buttonStyle = () => css`
  opacity: 50%;
  pointer-events: none;
`;

const acceptIconStyle = css`
  width: 56px;
  display: flex;
  justify-content: center;
`;

const checkIconStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-success)',
  color: '#fff',
  padding: '4px',
};
