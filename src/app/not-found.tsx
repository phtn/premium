import Link from "next/link";
import { Orbiter } from "@/components/app/orbiter";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-[calc(100vw)] items-center justify-center">
      <div className="flex items-center space-x-8 text-default-600">
        <Orbiter />
        <div className="flex w-full flex-col items-center justify-start space-y-3 py-6 tracking-tight">
          <p className="text-xl font-bold">You have done well, brightstar!</p>
          <div className="max-w-[32ch] text-justify text-sm opacity-80">
            If you want to go back to base reality and exit the simulation, this
            <Link
              href={"/"}
              className="font-ibm px-2 font-medium text-primary-500"
            >
              link
            </Link>{" "}
            might help you
            <p className="p-2 text-end text-xs font-semibold text-gray-900 ">
              {" "}
              -- Mr. 404
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
