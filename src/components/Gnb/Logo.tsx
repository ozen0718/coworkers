import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/icons/logo_lg.svg"
        alt="Coworkers logo"
        width={158}
        height={32}
        className="hidden lg:block"
      />
      <Image
        src="/icons/logo_sm.svg"
        alt="Coworkers logo"
        width={102}
        height={20}
        className="block lg:hidden"
      />
    </Link>
  );
}
