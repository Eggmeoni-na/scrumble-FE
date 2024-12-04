import { Container, Footer, Header, Main } from '@/components/layouts';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <Container>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Container>
);

export default MainLayout;
