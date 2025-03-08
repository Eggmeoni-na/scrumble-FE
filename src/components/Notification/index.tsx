import { hasUnreadNotifications } from '@/apis';
import { Check, Close } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button, Overlay } from '@/components/common';
import { commonButtonStyle, headerStyle, sidebarContainer } from '@/components/common/Sidebar/style';
import {
  acceptIconStyle,
  buttonStyle,
  checkIconStyle,
  itemStyle,
  listStyle,
  markStyle,
} from '@/components/Notification/style';
import { INVITATION_TYPE } from '@/constants/squad';
import { useNotificationUpdateContext } from '@/context/notification';
import { useInfinite, useToastHandler } from '@/hooks';
import { useAcceptInvitation } from '@/hooks/mutations';
import useUpdateNotification from '@/hooks/mutations/useUpdateNotification';
import { notificationInfiniteQueryOptions, squadKeys } from '@/hooks/queries';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { NotificationResponse, NotificationUpdateRequestPayload } from '@/types';
import { getDateRange } from '@/utils/getDateRange';
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
          <IconWrapper aria-label="사이드바 닫기" onClick={handleClose} role="button" css={commonButtonStyle}>
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
  const isAccept = notificationStatus === 'COMPLETED';
  const { failedToast, successToast } = useToastHandler();
  const { setHasUnreadMessages } = useNotificationUpdateContext();

  const queryClient = useQueryClient();
  const { updateNotificationMutate } = useUpdateNotification();
  const { acceptInvitation } = useAcceptInvitation();

  const handleReadStatus = async () => {
    if (read) return;

    const params: NotificationUpdateRequestPayload = {
      notificationStatus,
      readFlag: true,
    };

    await updateNotificationMutate({ notificationId, params });
    const {
      data: { hasUnreadMessages },
    } = await hasUnreadNotifications(getDateRange());

    setHasUnreadMessages(hasUnreadMessages);
  };

  const handleAccept = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await acceptInvitation({ squadId: notificationData.squadId });
      const params: NotificationUpdateRequestPayload = {
        notificationStatus: 'COMPLETED',
        readFlag: read,
      };
      updateNotificationMutate({ notificationId, params });
      successToast('스쿼드에 참여했어요');
      queryClient.refetchQueries({ queryKey: squadKeys.squad, exact: true });
    } catch {
      failedToast('잠시 후 다시 시도해주세요');
    }
  };

  return (
    <li css={[itemStyle, markStyle(read)]}>
      <button onClick={handleReadStatus} style={fullSizeButtonStyle} aria-label="알림 읽기">
        <p>{notificationMessage}</p>
      </button>
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
