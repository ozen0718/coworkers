import { CurrentEmail } from '@/components/common/Inputs';
import { UserProps } from './types';

export default function CurrentEmailSection({ email }: UserProps) {
  return (
    <div className="flex flex-col gap-3">
      <label>이메일</label>
      {/* email 임시 적용 */}
      <CurrentEmail email={email} />
    </div>
  );
}
