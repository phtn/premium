import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="access-logo"
      src="/svg/access_logo.svg"
      width={0}
      height={0}
      unoptimized
      priority
      className="h-5 w-auto text-gray-900 md:h-6"
    />
  );
};
