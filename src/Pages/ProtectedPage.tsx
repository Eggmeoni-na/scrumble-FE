import useUserCookie from '@/hooks/useUserCookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const ProtectedPage = ({ children }: Props) => {
  const { user } = useUserCookie();

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
