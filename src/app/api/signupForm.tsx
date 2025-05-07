import { useState } from 'react';
import { signup } from './auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    teamId: '13-4',
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form);
      toast.success('회원가입 성공!');
      router.push('/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="이메일" onChange={handleChange} />
      <input name="nickname" placeholder="닉네임" onChange={handleChange} />
      <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
      <input
        name="passwordConfirmation"
        type="password"
        placeholder="비밀번호 확인"
        onChange={handleChange}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
