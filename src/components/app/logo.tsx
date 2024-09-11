import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="access-logo"
      src="/svg/oms_v6.svg"
      width={0}
      height={0}
      unoptimized
      priority
      className="h-8 w-auto animate-enter text-gray-900 bg-blend-multiply delay-300 md:h-14"
    />
  );
};
