import { Container, Main } from '@/components/layouts';
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
