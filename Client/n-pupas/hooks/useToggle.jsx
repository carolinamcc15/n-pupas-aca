import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggle = value => setIsVisible(value ? value : !isVisible);

  return [isVisible, toggle];
};

export default useToggle;
