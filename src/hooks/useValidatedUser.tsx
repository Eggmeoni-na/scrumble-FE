import { useAuthStore } from '@/stores/auth';

const useValidatedUser = () => {
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    throw new Promise(() => {});
  }

  return user;
};

export default useValidatedUser;
