// usePersistentState.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to manage persistent state synchronized with sessionStorage.
 * @param {string} key The key under which the state will be stored in sessionStorage.
 * @param {any} defaultValue The default value of the state.
 * @returns {[any, function]} The state and the state setter function.
 */

const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistentState;
