import { KeyboardEvent } from 'react';

export const handleKeyDown = (e: KeyboardEvent<HTMLElement>, callback: VoidFunction) => {
  if (e.key === 'Enter') {
    callback();
  }
};
