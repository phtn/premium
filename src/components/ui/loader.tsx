import { cn } from "@/utils/cn";
import { Spinner } from "@nextui-org/react";

export const Loader = (props: { sm?: boolean; label: string }) => (
  <div
    className={cn("flex items-center space-x-4 p-6", { "p-12": !!props.sm })}
  >
    <Spinner color="default" size={props.sm ? "sm" : "lg"} />
  </div>
);
