import { useState, ChangeEvent } from 'react';

export default function useValidatedInput(validator: (value: string) => boolean): {
  value: string;
  setValue: (value: string) => void;
  touched: boolean;
  isInvalid: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
} {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && (!validator(value) || value.length === 0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  return {
    value,
    setValue,
    touched,
    isInvalid,
    onChange,
    onBlur,
  };
}
