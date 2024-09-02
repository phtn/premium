import { type DualIcon } from "@/types";
import { Button, type ButtonProps } from "@nextui-org/button";
import Link from "next/link";
import { forwardRef, type ReactNode } from "react";

interface LinkBtnProps extends ButtonProps {
  label?: string;
  href: string;
  icon?: DualIcon;
  children?: ReactNode;
}
export const LinkBtn = forwardRef<HTMLButtonElement, LinkBtnProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        isIconOnly={props.isIconOnly}
        ref={ref}
        href={props.href}
        as={Link}
        color="secondary"
        className="flex items-center space-x-2 bg-transparent capitalize tracking-tighter hover:text-sky-600 portrait:text-sm"
      >
        {props.icon && <props.icon className={"size-5"} />}
        {props.label}
        {props?.children}
      </Button>
    );
  },
);
LinkBtn.displayName = "LinkBtn";
