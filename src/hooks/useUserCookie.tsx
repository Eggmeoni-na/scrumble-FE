import { AuthUser } from '@/types';
import { useCookies } from 'react-cookie';

const useUserCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const getCookie = (): AuthUser | null => (cookies.user ? cookies.user : null);
  const user = getCookie();

  const clearCookie = () => removeCookie('user');

  return { user, getCookie, setCookie, clearCookie };
};

export default useUserCookie;
