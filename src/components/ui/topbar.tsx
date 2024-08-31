import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { LinkBtn } from "./buttons";
import type { DualIcon } from "@/app/index.types";
import Image from "next/image";

interface Brand {
  label?: string;
  href?: string;
}
export interface TopbarLink {
  label: string;
  href: string;
}
export interface Extras {
  type?: "icon" | "text";
  label?: string;
  href: string;
  icon?: DualIcon;
}
interface TopbarProps {
  brand: Brand;
  links?: TopbarLink[];
  extras?: Extras[];
}
export function Topbar({ brand, links, extras }: TopbarProps) {
  return (
    <Navbar shouldHideOnScroll isBlurred>
      <NavbarBrand>
        <Image
          alt="access-logo"
          src="/svg/access_logo.svg"
          width={0}
          height={0}
          unoptimized
          priority
          className="h-5 w-auto text-gray-900 md:h-6"
        />
        <div className="mx-2 font-semibold tracking-tighter text-gray-600 md:mx-4 portrait:text-sm">
          {brand.label}
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {links?.map((link, i) => (
          <NavbarItem key={`${i}_${link.label}`}>
            <LinkBtn label={link.label} href={link.href} />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {extras?.map((extra, i) => (
          <NavbarItem key={`${i}_${extra.label}`}>
            <LinkBtn
              isIconOnly={extra.type === "icon"}
              icon={extra.icon}
              label={extra.label}
              href={extra.href}
            ></LinkBtn>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
