import { useCallback, useState } from 'react';

const useOpenToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggleOpen };
};

export default useOpenToggle;
