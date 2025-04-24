'use client';

import Link from 'next/link';

interface ProfileItemProps {
  text: string;
  href?: string;
  onClick?: () => void;
}

export default function ProfileItem({ text, href, onClick }: ProfileItemProps) {
  const commonClass = 'text-md-regular text-gray100 cursor-pointer';

  if (onClick) {
    return (
      <div onClick={onClick} className={commonClass}>
        {text}
      </div>
    );
  }

  return (
    <Link href={href ?? '#'} className={commonClass}>
      {text}
    </Link>
  );
}
