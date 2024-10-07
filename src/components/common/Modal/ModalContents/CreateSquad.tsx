import Button from '@/components/common/Button/Button';
import ModalButtonGroup from '@/components/common/Modal/ModalTemplate/ModalButtonGroup';
import ModalContent from '@/components/common/Modal/ModalTemplate/ModalContent';
import ModalHeader from '@/components/common/Modal/ModalTemplate/ModalHeader';
import ModalTemplate from '@/components/common/Modal/ModalTemplate/ModalTemplate';
import { ModalContentProps } from '@/types';
import { css, Theme } from '@emotion/react';
import { FormEvent, useState } from 'react';

const CreateSquad = ({ onSubmit, onAbort }: ModalContentProps<string>) => {
  const [squadName, setSquadName] = useState('');

  const handleCreateSquad = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(squadName);
  };

  return (
    <ModalTemplate isOverlay={true} onClose={onAbort} preventClick={false}>
      <ModalHeader title={'스쿼드 생성'} onClose={onAbort} />
      <ModalContent>
        <p css={descStyle}>스쿼드명을 입력해주세요.</p>
        <form onSubmit={handleCreateSquad}>
          <input
            css={inputStyle}
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            maxLength={9}
          />
          <ModalButtonGroup>
            <Button text="취소" onClick={() => onAbort('취소')} name="cancel" variant="default" />
            <Button text="확인" name="confirm" variant="primary" type="submit" />
          </ModalButtonGroup>
        </form>
      </ModalContent>
    </ModalTemplate>
  );
};

export default CreateSquad;

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
  font-size: ${theme.typography.size_16};
`;
