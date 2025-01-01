import useUserCookie from '@/hooks/useUserCookie';
import { assert } from '@/utils';

const useValidatedUser = () => {
  const { user } = useUserCookie();

  assert(user !== null, 401);

  return { userId: user.id };
};

export default useValidatedUser;
