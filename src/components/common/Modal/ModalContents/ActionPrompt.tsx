import { Button } from '@/components/common';
import { ModalButtonGroup, ModalContent, ModalTemplate } from '@/components/common/Modal';

import { ActionModalContentProps } from '@/types';
import { css, Theme } from '@emotion/react';

const ActionPrompt = ({ onSubmit, onAbort, actionModal }: ActionModalContentProps) => (
  <ModalTemplate isOverlay={true} onClose={onAbort}>
    <ModalContent>
      <p css={descStyle}>{actionModal.message}</p>
      <ModalButtonGroup>
        {actionModal.displayCancel && (
          <Button text="닫기" onClick={() => onAbort()} name="cancel" variant="default" type="button" />
        )}
        <Button
          text={actionModal.text}
          name={actionModal.type}
          variant={actionModal.type}
          type="submit"
          onClick={() => onSubmit(actionModal.text)}
        />
      </ModalButtonGroup>
    </ModalContent>
  </ModalTemplate>
);

export default ActionPrompt;

const descStyle = (theme: Theme) => css`
  padding: 36px 0;
  text-align: center;
  ${theme.typography.size_18}
  color: ${theme.colors.black.black300};
`;
