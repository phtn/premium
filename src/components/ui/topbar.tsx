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
import { motion } from "framer-motion";
import { useAuthState } from "@/utils/hooks/authState";
import { auth } from "@/lib/firebase/config";
import { useCallback } from "react";
import { Loader } from "lucide-react";
import { useCart } from "@/app/ctx";

export interface Brand {
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
  brand?: Brand;
  links?: TopbarLink[];
  extras?: Extras[];
}
export function Topbar({ brand, extras }: TopbarProps) {
  const { user } = useAuthState(auth);
  const { itemCount, loading } = useCart();

  const CartItemCount = useCallback(() => {
    if (loading)
      return <Loader className="size-3 shrink-0 animate-spin text-white" />;
    return <p className="animate-enter">{itemCount}</p>;
  }, [loading, itemCount]);

  const NavContentExtra = useCallback(() => {
    return (
      <NavbarContent justify="end">
        {extras?.map((extra, i) => (
          <NavbarItem key={`${i}_${extra.label}`}>
            <LinkBtn
              isIconOnly={extra.type === "icon"}
              icon={extra.icon}
              label={
                extra.type === "icon" ? "" : (user?.displayName ?? extra.label)
              }
              href={
                user?.uid
                  ? extra.type === "icon"
                    ? `${extra.href}/${user.uid}`
                    : `/account`
                  : extra.href
              }
              className="shrink-0 px-2"
            >
              {extra.type === "icon" ? (
                <div className="-ml-5 mb-2 flex size-[24px] animate-enter items-center justify-center rounded-full border-[3px] border-white bg-gray-800 font-ibm text-[10px] font-medium text-white shadow-md">
                  <CartItemCount />
                </div>
              ) : null}
            </LinkBtn>
          </NavbarItem>
        ))}
      </NavbarContent>
    );
  }, [extras, CartItemCount, user]);
  return (
    <Navbar shouldHideOnScroll isBlurred maxWidth="xl">
      <NavbarBrand>
        <Link href="/">
          <div>
            <Logo />
          </div>
          <motion.div className="mx-4 animate-enter font-sarabun font-medium tracking-tighter text-gray-800 md:mx-4 portrait:text-sm">
            {brand?.label}
          </motion.div>
        </Link>
      </NavbarBrand>
      <NavContentExtra />
    </Navbar>
  );
}
