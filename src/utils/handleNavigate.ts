import { NavigateFunction } from 'react-router-dom';

export const handleNavigate = (navigate: NavigateFunction, path: string | number, replace?: boolean) => {
  if (typeof path === 'number') {
    navigate(path);
  } else {
    navigate(path, { replace });
  }
};
