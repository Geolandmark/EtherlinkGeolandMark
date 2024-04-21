import { useState, useEffect, useRef } from 'react';

const useClickOutsideCancel = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setState(initialState);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return [state, setState, ref];
};

export default useClickOutsideCancel;