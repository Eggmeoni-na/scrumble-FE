import { Button } from '@/components/common/Button';
import { descStyle, inputStyle } from '@/components/common/Modal/ModalContents/SquadForm';
import { ModalButtonGroup, ModalContent, ModalHeader, ModalTemplate } from '@/components/common/Modal/ModalTemplate';
import { ModalContentProps } from '@/types';
import { FormEvent, useState } from 'react';

const EmailInputModal = ({ onSubmit, onAbort }: ModalContentProps<string>) => {
  const [email, setEmail] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <ModalTemplate isOverlay={true} onClose={onAbort} preventClick={false}>
      <ModalHeader title="테스트 계정 로그인" onClose={onAbort} />
      <ModalContent>
        <p css={descStyle}>이메일을 입력해주세요.</p>
        <form onSubmit={handleLogin}>
          <input css={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          <ModalButtonGroup>
            <Button text="취소" onClick={() => onAbort('취소')} name="cancel" variant="default" type="button" />
            <Button text="로그인" name="confirm" variant="primary" type="submit" />
          </ModalButtonGroup>
        </form>
      </ModalContent>
    </ModalTemplate>
  );
};

export default EmailInputModal;
