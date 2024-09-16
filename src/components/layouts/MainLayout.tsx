import Container from '@/components/layouts/Container';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Main from '@/components/layouts/Main';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
