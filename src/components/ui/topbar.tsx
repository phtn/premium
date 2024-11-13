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
import { useCallback } from "react";
import { useAuthCtx } from "@/app/ctx/auth";
import { useCart } from "@/app/ctx/cart";
import { MinusIcon } from "@heroicons/react/24/outline";

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
  const { user, uid } = useAuthCtx();
  const { itemCount, loading } = useCart();

  const CartItemCount = useCallback(() => {
    if (loading)
      return (
        <MinusIcon className="size-3 animate-spin stroke-[2px] text-white" />
      );
    return (
      <p className="animate-enter font-sarabun font-semibold">{itemCount}</p>
    );
  }, [loading, itemCount]);

  const NavContentExtra = useCallback(() => {
    return (
      <NavbarContent justify="end" className="bg-white">
        {extras?.map((extra, i) => (
          <NavbarItem key={`${i}_${extra.label}`}>
            <LinkBtn
              isIconOnly={extra.type === "icon"}
              icon={extra.icon}
              label={
                extra.type === "icon" ? "" : (user?.displayName ?? extra.label)
              }
              href={
                uid
                  ? extra.type === "icon"
                    ? `${extra.href}/${uid}`
                    : `/account/${uid}`
                  : extra.href
              }
              className="shrink-0 px-2"
            >
              {extra.type === "icon" ? (
                <div className="-ml-5 mb-2 flex size-[24px] items-center justify-center rounded-full border-[2px] border-white bg-foreground font-ibm text-[10.5px] font-medium text-white shadow-md">
                  <CartItemCount />
                </div>
              ) : null}
            </LinkBtn>
          </NavbarItem>
        ))}
      </NavbarContent>
    );
  }, [extras, CartItemCount, user, uid]);
  return (
    <Navbar shouldHideOnScroll isBlurred maxWidth="xl" className="bg-white">
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
