import { assignSquadLeader } from '@/apis';
import { Check } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import MemberProfile from '@/components/common/Member/MemberProfile';
import { ActionPrompt } from '@/components/common/Modal/ModalContents';

import { ROLE } from '@/constants/role';
import { squadDetailQueryOptions, squadKeys } from '@/hooks/queries/useSquad';
import { useModal } from '@/hooks/useModal';
import { useToastStore } from '@/stores/toast';
import { SquadMember } from '@/types';
import { css, Theme } from '@emotion/react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectMemberList = ({ squadId }: { squadId: number }) => {
  const squadMembers = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
    refetchOnMount: false,
    select: ({ data: squad }) => squad.squadMembers.filter((member) => member.squadMemberRole === ROLE.NORMAL),
  }).data;

  return (
    <ul css={containerStyle}>
      {squadMembers.map((member) => (
        <Member key={member.memberId} squadId={squadId} member={member} />
      ))}
    </ul>
  );
};

export default SelectMemberList;

const Member = ({ squadId, member }: { squadId: number; member: SquadMember }) => {
  const [isChecked, setIsChecked] = useState(false);
  const createToast = useToastStore((state) => state.createToast);
  const navigate = useNavigate();
  const { ModalContainer: AssignSquadLeaderModal, openModal } = useModal();

  const queryClient = useQueryClient();
  const { mutate: assignSquadLeaderMutate } = useMutation({
    mutationFn: assignSquadLeader,
    onSuccess: () => {
      navigate(-1);
      createToast({ type: 'success', message: '스쿼드 리더가 변경되었어요', duration: 2000, showCloseButton: false });
      queryClient.invalidateQueries({
        queryKey: squadKeys.squadDetail(squadId),
      });
    },
    onError: () => createToast({ type: 'failed', message: '잠시 후 다시 시도해주세요 😢' }),
  });

  const handleSelectMember = async () => {
    setIsChecked(!isChecked);
    const assignInfo = {
      type: 'confirm',
      text: '확인',
      message: `${member.name}님에게 권한을 위임할까요?
      변경을 취소할 수 없어요.`,
      displayCancel: true,
    } as const;

    const res = await openModal(ActionPrompt, undefined, assignInfo);
    if (res.ok) {
      assignSquadLeaderMutate({ squadId, memberId: member.memberId });
    } else {
      setIsChecked(false);
    }
  };

  return (
    <>
      <li css={itemStyle} onClick={handleSelectMember}>
        <MemberProfile member={member} infoStyle={infoStyle} imgStyle={imgStyle} displayRole={false} />
        <IconWrapper
          aria-label={isChecked ? 'Selected member' : 'Unselected member'}
          aria-checked={isChecked}
          role="checkbox"
          css={[checkIconStyle, isChecked && checkedStyle]}
        >
          {isChecked && <Check />}
        </IconWrapper>
      </li>
      <AssignSquadLeaderModal />
    </>
  );
};

const containerStyle = css`
  margin: 24px 16px;
`;

const itemStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px;

  & svg {
    stroke-width: 2.5;
  }

  :hover {
    background-color: rgba(231, 201, 138, 0.3);
    border-radius: 12px;
  }
`;

const checkIconStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.white};
  border: 3px solid ${theme.colors.gray.gray100};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const checkedStyle = (theme: Theme) => css`
  background-color: ${theme.colors.secondary};
  border: none;

  & svg {
    color: black;
    width: 16px;
    height: 16px;
  }
`;

const imgStyle = css`
  width: 36px;
  height: 36px;
  border-radius: 16px;
`;

const infoStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
