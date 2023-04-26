import { useState, useCallback } from 'react';

export default (initialValue = null) => {
  const [account, setAccount] = useState({
    id: '',
    pw: '',
    pwRewind: '',
    name: '',
    email: '',
    sex: '',
    age: 0,
  });
  const [value, setValue] = useState(initialValue);
  console.log(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
    setAccount(...account, e.target.value);
  }, []);
  return [value, handler, setValue];
};
