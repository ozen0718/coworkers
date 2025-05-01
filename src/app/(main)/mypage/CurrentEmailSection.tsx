import { CurrentEmail } from "@/components/common/Inputs";

export default function CurrentEmailSection() {
  return (
    <div className="flex flex-col gap-3">
      <label>이메일</label>
      {/* email 임시 적용 */}
      <CurrentEmail email="coworker@codeit.com" />
    </div>
  );
}
