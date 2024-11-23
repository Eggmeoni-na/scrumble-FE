import { KeyboardEvent } from 'react';

const handleKeyDown = (e: KeyboardEvent<HTMLElement>, callback: VoidFunction) => {
  if (e.key === 'Enter') {
    callback();
  }
};

export default handleKeyDown;
