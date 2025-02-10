import { Button } from '@/components/common';
import { ModalButtonGroup, ModalContent, ModalHeader, ModalTemplate } from '@/components/common/Modal';
import { ModalContentProps } from '@/types';
import { css, Theme } from '@emotion/react';
import { FormEvent, useState } from 'react';

const SquadForm = ({ onSubmit, onAbort, isEdit = false }: ModalContentProps<string> & { isEdit?: boolean }) => {
  const [squadName, setSquadName] = useState('');

  const handleCreateSquad = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(squadName);
  };

  const handleUpdateSquadName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(squadName);
  };

  return (
    <ModalTemplate isOverlay={true} onClose={onAbort} preventClick={false}>
      <ModalHeader title={!isEdit ? '스쿼드 생성' : '스쿼드명 수정'} onClose={onAbort} />
      <ModalContent>
        <p css={descStyle}>스쿼드명을 입력해주세요.</p>
        <form onSubmit={!isEdit ? handleCreateSquad : handleUpdateSquadName}>
          <input
            css={inputStyle}
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <ModalButtonGroup>
            <Button text="취소" onClick={() => onAbort('취소')} name="cancel" variant="default" type="button" />
            <Button text={!isEdit ? '확인' : '수정'} name="confirm" variant="primary" type="submit" />
          </ModalButtonGroup>
        </form>
      </ModalContent>
    </ModalTemplate>
  );
};

export default SquadForm;

const descStyle = (theme: Theme) => css`
  color: ${theme.colors.black.black300};
`;

const inputStyle = (theme: Theme) => css`
  width: 100%;
  height: 40px;
  border: 1.5px solid #dfdfdf;
  border-radius: 6px;
  margin: 16px 0;
  padding: 0 8px;
  ${theme.typography.size_16}
`;
