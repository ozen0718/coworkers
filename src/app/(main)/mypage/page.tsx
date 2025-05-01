import EditableNameSection from './EditableNameSection';
import CurrentEmailSection from './CurrentEmailSection';
import EditablePasswordSection from './EditablePasswordSection';
import AccountDeleteButton from './AccountDeleteButton';
import EditableProfileSection from './EditableProfileSection';

export default function MyPage() {
  return (
    <div className="mx-auto flex max-w-[792px] flex-col gap-6 py-10 px-4 md:px-6">
      <h2 className="text-2lg-bold">계정 설정</h2>

      <EditableProfileSection width={64} />

      <div className="flex flex-col gap-4">
        <EditableNameSection />
        <CurrentEmailSection />
        <EditablePasswordSection />
      </div>

      <AccountDeleteButton />
    </div>
  );
}
