import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { LinkBtn } from "./buttons";
import type { DualIcon } from "@/types";
import { Logo } from "@/components/app/logo";
import { easeOut, motion } from "framer-motion";
import { useAuthState } from "@/utils/hooks/authState";
import { auth } from "@/lib/firebase/config";

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
  const { user } = useAuthState(auth);

  return (
    <Navbar shouldHideOnScroll isBlurred>
      <NavbarBrand>
        <Link href="/">
          <motion.div
            initial={{
              x: 5,
            }}
            transition={{
              duration: 2,
              easing: easeOut,
            }}
            animate={{ x: 0 }}
          >
            <Logo />
          </motion.div>
          <motion.div className="mx-4 animate-enter font-medium tracking-tighter text-gray-600 md:mx-4 portrait:text-sm">
            {brand.label}
          </motion.div>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {links?.map((link, i) => (
          <NavbarItem key={`${i}_${link.label}`}>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                x: -10,
                backfaceVisibility: "hidden",
              }}
              transition={{
                duration: 0.15,
                bounce: 0.1,
                delay: 0.1,
                easing: easeOut,
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
            >
              <LinkBtn label={link.label} href={link.href} />
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {extras?.map((extra, i) => (
          <NavbarItem key={`${i}_${extra.label}`}>
            <LinkBtn
              isIconOnly={extra.type === "icon"}
              icon={extra.icon}
              label={user?.displayName ?? extra.label}
              href={user ? "/account" : extra.href}
            ></LinkBtn>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
