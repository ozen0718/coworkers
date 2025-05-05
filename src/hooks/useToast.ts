import { useState } from 'react';

export default function useToast(duration = 3000) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return { message, visible, showToast };
}
