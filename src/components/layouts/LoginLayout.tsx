import Container from '@/components/layouts/Container';
import Main from '@/components/layouts/Main';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LoginLayout = ({ children }: Props) => (
    <Container>
      <Main>{children}</Main>
    </Container>
  );

export default LoginLayout;
