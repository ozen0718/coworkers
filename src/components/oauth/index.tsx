import OAuthButtonGroup from './OuthBtn';

interface OAuthUIProps {
  authType: 'login' | 'signup';
}

export default function OAuth({ authType }: OAuthUIProps) {
  const authText = authType === 'login' ? '간편 로그인하기' : '간편 회원가입하기';

  return (
    <div className="flex w-full flex-col gap-4 text-white">
      {/* OR 라인 */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <p className="text-md-medium text-white">OR</p>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg-medium whitespace-nowrap">{authText}</p>
        <OAuthButtonGroup />
      </div>
    </div>
  );
}
