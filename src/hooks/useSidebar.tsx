import { useCallback, useState } from 'react';

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggleSidebar };
};

export default useSidebar;
