import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Sahil Mishra — home"
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-[80] block"
    >
      <Image src="/site-logo-mark.png" alt="" width={404} height={195} priority className="h-8 w-auto sm:h-9" />
    </Link>
  );
}
