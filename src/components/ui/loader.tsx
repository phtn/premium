import { Spinner } from "@nextui-org/react";

export const Loader = (props: { sm?: boolean; label: string }) => (
  <div className="m-20 flex size-fit items-center space-x-4 rounded-full bg-white p-6">
    <Spinner size={props.sm ? "sm" : "lg"} className="text-gray-500" />
    <p className="font-ibm text-xs tracking-wider text-gray-800/60">
      {props.label}
    </p>
  </div>
);
