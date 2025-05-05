import { useState } from 'react';

export default function useValidatedInput(validator: (value: string) => boolean) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && (!validator(value) || value.length === 0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  return { value, setValue, touched, isInvalid, onChange, onBlur };
}
