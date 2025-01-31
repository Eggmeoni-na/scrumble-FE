import { ActionModal } from '@/components/common/Modal';
import { useModal, useUserCookie } from '@/hooks';
import { breakpoints, mobileMediaQuery, pcMediaQuery } from '@/styles/breakpoints';
import { ActionModalType, ApiErrorResponse } from '@/types';
import { handleNavigate } from '@/utils';
import { css, Theme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

interface Props extends FallbackProps {
  error: AxiosError<ApiErrorResponse>;
  queryKey?: readonly (string | number)[];
}

const ModalFallback = ({ error, resetErrorBoundary, queryKey }: Props) => {
  const navigate = useNavigate();
  const { openModal, ModalContainer } = useModal();
  const { clearCookie } = useUserCookie();
  const queryClient = useQueryClient();

  const handleError = async (modalOptions: ActionModalType, redirectPath: string | number) => {
    const res = await openModal(ActionModal, undefined, modalOptions);
    if (res.ok) {
      resetErrorBoundary();
      if (queryKey) {
        queryClient.resetQueries({ queryKey });
      } else {
        queryClient.resetQueries();
      }
      if (redirectPath === '/login') {
        clearCookie();
      }
      handleNavigate(navigate, redirectPath, true);
    }
  };

  useEffect(() => {
    const handleModal = async () => {
      if (error.status === 401) {
        await handleError(
          {
            type: 'confirm',
            text: '로그인',
            message: '인증이 만료되었어요\n로그인 후 다시 시도해주세요',
            displayCancel: false,
          },
          '/login',
        );
      } else {
        await handleError(
          {
            type: 'confirm',
            text: '확인',
            message: error.response?.data.message || '예상치 못한 에러가 발생했어요.\n잠시 후 다시 시도해주세요',
            displayCancel: false,
          },
          '/',
        );
      }
    };

    handleModal();
  }, [error]);

  return (
    <div css={containerStyles}>
      <ModalContainer />
    </div>
  );
};

export default ModalFallback;

const containerStyles = (theme: Theme) => css`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.background.lightYellow};

  ${mobileMediaQuery(css`
    max-width: ${breakpoints.mobile};
  `)}

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}
`;
