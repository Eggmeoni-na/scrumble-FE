import { Check, Close } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button, Overlay } from '@/components/common';
import { commonButtonStyle, headerStyle, sidebarContainer } from '@/components/common/Sidebar';
import { INVITATION_TYPE } from '@/constants/squad';
import { useInfinite, useToastHandler } from '@/hooks';
import { useAcceptInvitation } from '@/hooks/mutations';
import useUpdateNotification from '@/hooks/mutations/useUpdateNotification';
import { notificationInfiniteQueryOptions, squadKeys } from '@/hooks/queries';
import { scrollBarStyle } from '@/styles/globalStyles';
import { NotificationResponse, NotificationUpdateRequestPayload } from '@/types';
import { css, Theme } from '@emotion/react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, MouseEventHandler } from 'react';

const Notification = ({ toggleOpen }: { toggleOpen: VoidFunction }) => {
  const { data: notifications, fetchNextPage, hasNextPage } = useInfiniteQuery(notificationInfiniteQueryOptions());

  const handleClose = () => toggleOpen();
  const loadMoreNotifications = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
      <div css={sidebarContainer} onClick={(e) => e.stopPropagation()} role="presentation">
        <header css={headerStyle}>
          <h1>알림</h1>
          <IconWrapper aria-label="Close sidebar" onClick={handleClose} role="button" css={commonButtonStyle}>
            <Close />
          </IconWrapper>
        </header>
        <Notification.List
          notifications={notifications ?? []}
          loadMoreNotifications={loadMoreNotifications}
          hasNextPage={hasNextPage}
        />
      </div>
    </Overlay>
  );
};

export default Notification;

const NotificationList = ({
  notifications,
  loadMoreNotifications,
  hasNextPage,
}: {
  notifications: NotificationResponse[];
  loadMoreNotifications: VoidFunction;
  hasNextPage: boolean;
}) => {
  const { loadMoreRef } = useInfinite(loadMoreNotifications, hasNextPage);

  return (
    <ul css={listStyle}>
      {notifications.map((data) => (
        <Notification.Item key={data.notificationId} data={data} />
      ))}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          style={{
            color: 'transparent',
          }}
        >
          Loading...
        </div>
      )}
    </ul>
  );
};

const NotificationItem = ({ data }: { data: NotificationResponse }) => {
  const { notificationType, notificationData, read, notificationId, notificationMessage, notificationStatus } = data;
  const { failedToast, successToast } = useToastHandler();
  const isAccept = notificationStatus === 'COMPLETED';

  const queryClient = useQueryClient();
  const { updateNotificationMutate } = useUpdateNotification();
  const { acceptInvitation } = useAcceptInvitation({
    onMutate: () => {
      try {
        // 수락 여부 변경
        const params: NotificationUpdateRequestPayload = {
          notificationStatus: 'COMPLETED',
          readFlag: read,
        };

        updateNotificationMutate({ notificationId: data.notificationId, params });
      } catch (error) {
        console.error('Notification onMutate Error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      successToast('스쿼드에 참여했어요');
      queryClient.refetchQueries({ queryKey: squadKeys.squad }); // 스쿼드 목록 리페치
    },
    onError: () => {
      failedToast('잠시 후 다시 시도해주세요');
    },
  });

  const handleReadStatus = () => {
    if (read) return;
    const params: NotificationUpdateRequestPayload = {
      notificationStatus,
      readFlag: true,
    };
    updateNotificationMutate({ notificationId, params });
  };

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    acceptInvitation({ squadId: notificationData.squadId }); // 스쿼드 초대 수락 (API 다름)
  };

  return (
    <li
      css={[itemStyle, markStyle(read)]}
      onClick={handleReadStatus}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleReadStatus();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <p>{notificationMessage}</p>
      {notificationType === INVITATION_TYPE.INVITE_REQUEST && (
        <AcceptStatus isAccept={isAccept} onAccept={handleAccept} />
      )}
    </li>
  );
};

const AcceptStatus = ({ isAccept, onAccept }: { isAccept: boolean; onAccept: MouseEventHandler }) => {
  if (!isAccept) {
    return <Button text="수락" variant="primary" onClick={onAccept} css={[isAccept && buttonStyle]} />;
  }
  return (
    <IconWrapper css={acceptIconStyle} onClick={(e) => e.stopPropagation()}>
      <Check style={checkIconStyle} />
    </IconWrapper>
  );
};

Notification.List = NotificationList;
Notification.Item = NotificationItem;

const listStyle = css`
  margin-top: 24px;
  overflow-y: auto;

  ${scrollBarStyle}
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
