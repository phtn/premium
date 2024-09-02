"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ClassName, DualIcon } from "@/types";

export interface FloatingNavItem {
  name: string;
  link: string;
  icon?: DualIcon;
}

interface FloatingNavProps {
  navItems: FloatingNavItem[];
  className?: ClassName;
}

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-6 rounded-full border border-transparent bg-white py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
          className,
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-1 text-white hover:text-neutral-800",
            )}
          >
            <div className="">
              {navItem.icon ? (
                <navItem.icon className="size-3.5 text-white/60" />
              ) : null}
            </div>
            <div className="text-sm">
              <p className="leading-2 font-medium tracking-tighter">
                {navItem.name}
              </p>
            </div>
          </Link>
        ))}
        <button className="relative rounded-full bg-neutral-900/90 px-4 py-2 text-sm font-medium text-white">
          <p className="text-xs font-semibold tracking-tighter">Get 10% off</p>
          {/* <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" /> */}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
