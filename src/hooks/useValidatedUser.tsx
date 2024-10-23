import { useAuthStore } from '@/stores';

const useValidatedUser = () => {
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    throw new Promise(() => {});
  }

  return user;
};

export default useValidatedUser;
