'use client';

import OAuthButton from './OAuthButton';

export default function OAuthButtonGroup() {
  const handleOAuthLogin = (provider: 'google' | 'kakao') => {
    console.log(`${provider} 로그인 시도`);
    // TODO: API 연동
  };

  return (
    <div className="flex gap-3">
      <OAuthButton provider="google" onClick={handleOAuthLogin} />
      <OAuthButton provider="kakao" onClick={handleOAuthLogin} />
    </div>
  );
}
