import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Sahil Mishra — home"
      className="fixed top-6 left-6 z-[80] block"
    >
      <Image src="/site-logo-mark.png" alt="" width={404} height={195} priority className="h-9 w-auto" />
    </Link>
  );
}
