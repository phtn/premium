"use client";
import React from "react";
import {
  FloatingNav,
  type FloatingNavItem,
} from "@/components/ui/floating-nav";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export function FloatingNavbar() {
  const navItems: FloatingNavItem[] = [
    {
      name: "shop",
      link: "/shop",
      icon: ShoppingBagIcon,
    },
    {
      name: "events",
      link: "/buy",
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} className="bg-gray-900 text-white" />
    </div>
  );
}
