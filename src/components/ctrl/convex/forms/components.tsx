import { cn } from "@/utils/cn";
import type { PropsWithChildren, ReactNode } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "mt-1.5 bg-gradient-to-tr from-stone-200/30 via-zinc-200/30 to-default-200/30",
      "border-[0.33px] border-primary-400",
    )}
  >
    <FormHeader isLoading={false} isValid={true} title="Create New Category" />
    {children}
  </div>
);

const FormTitle = (props: { title?: string }) => (
  <div className="flex min-w-28 items-center justify-between space-x-4 whitespace-nowrap px-3">
    <p className="font-arc text-sm font-medium tracking-tight text-foreground drop-shadow-sm">
      {props.title}
    </p>
  </div>
);

interface FormHeaderProps {
  isLoading: boolean;
  isValid: boolean;
  children?: ReactNode;
  title?: string;
}
export const FormHeader = ({ children, title }: FormHeaderProps) => {
  return (
    <div className="flex w-full items-center border-b-[0.33px] border-primary-300 bg-primary-200/20 py-3.5 backdrop-blur-xl">
      <FormTitle title={title} />
      {children}
    </div>
  );
};
