"use client";
import { type PropsWithChildren, useState } from "react";
import {
  type Links,
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  BanknotesIcon,
  ReceiptRefundIcon,
  UsersIcon,
  RectangleGroupIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  PackageIcon,
  PencilLineIcon,
  ReceiptTextIcon,
  TruckIcon,
} from "lucide-react";
import { StatPanel, StatPanelContent } from "@/components/app/stat-panel";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "@/utils/hooks/authState";
import { auth } from "@/lib/firebase/config";
import { Image } from "@nextui-org/react";

export function AdminBoard({ children }: PropsWithChildren) {
  const { user } = useAuthState(auth);
  const links: Links[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: { type: "icon", content: RectangleGroupIcon },
    },
    {
      label: "Add Entities",
      href: "/admin/add/category",
      icon: { type: "icon", content: PlusIcon },
    },
    {
      label: "Customers",
      href: "#",
      icon: { type: "icon", content: UsersIcon },
    },
    {
      label: "Sales",
      href: "#",
      icon: { type: "icon", content: BanknotesIcon },
    },
    {
      label: "Orders",
      href: "#",
      icon: { type: "icon", content: ReceiptTextIcon },
    },
    {
      label: "Fulfillment",
      href: "#",
      icon: { type: "icon", content: ClipboardDocumentCheckIcon },
    },
    {
      label: "Deliveries",
      href: "#",
      icon: { type: "icon", content: TruckIcon },
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      icon: { type: "icon", content: PackageIcon },
    },
    // {
    //   label: "Payments",
    //   href: "/admin/payments",
    //   icon: { type: "icon", content: CreditCardIcon },
    // },
    {
      label: "Refunds",
      href: "#",
      icon: { type: "icon", content: ReceiptRefundIcon },
    },
    {
      label: "Storefront",
      href: "/",
      icon: { type: "icon", content: BuildingStorefrontIcon },
    },
    {
      label: "Blog Post",
      href: "#",
      icon: { type: "icon", content: PencilLineIcon },
    },
    {
      label: "Test Lab",
      href: "/admin/testlab/user",
      icon: { type: "icon", content: BeakerIcon },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <SidebarLink
              link={{
                label: "ADMIN",
                href: "/",
                icon: {
                  type: "image",
                  content: user?.photoURL ?? "/svg/oh.svg",
                },
              }}
            />
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="">
            <SidebarLink
              link={{
                label: user?.displayName ?? "user",
                href: "#",
                icon: {
                  type: "image",
                  content: user?.photoURL ?? "/svg/re-up_admin_logo.svg",
                },
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link href="#" className="relative z-20 flex items-center space-x-2 py-1">
      <Image
        alt="admin-logo"
        src={"/svg/oh.svg"}
        className="h-5 w-6 shrink-0 rounded-none bg-zinc-500"
        isBlurred
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre px-4 text-xs font-light uppercase tracking-widest text-neutral-800 dark:text-white"
      >
        Admin
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-orange-600 dark:bg-white" />
    </Link>
  );
};

export const Dashboard = () => {
  const arrtwo = [6, 9];
  const arrfour = [1, 2, 3, 4];
  return (
    <>
      <div className="mb-4 flex w-full gap-4">
        {arrfour.map((i) => (
          <StatPanel key={i} title="Users" tag="users" icon={UsersIcon}>
            <StatPanelContent statValue={10} statKey="" />
          </StatPanel>
        ))}
      </div>

      <div className="flex flex-1 gap-2">
        {arrtwo.map((i) => (
          <div
            key={"second" + i}
            className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          ></div>
        ))}
      </div>
    </>
  );
};
