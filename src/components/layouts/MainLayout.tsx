import { Container, Footer, Header, Main } from '@/components/layouts';
import { NotificationProvider } from '@/context/notification/provider';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <Container>
    <NotificationProvider>
      <Header />
    </NotificationProvider>
    <Main>{children}</Main>
    <Footer />
  </Container>
);

export default MainLayout;
