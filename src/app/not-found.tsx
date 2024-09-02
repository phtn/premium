import Link from "next/link";
import { Orbiter } from "@/components/app/orbiter";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-[calc(100vw)] items-center justify-center">
      <div className="flex space-x-8 text-default-600">
        <Orbiter />
        <div className="flex w-full flex-col items-center space-y-3 py-6 tracking-tight">
          <p className="text-xl font-bold">You have done well, brightstar!</p>
          <div className="max-w-[32ch] text-center text-sm opacity-80">
            If you&apos;re looking to exit from this simulation, this link might
            help you →{" "}
            <Link
              href={"/"}
              className="font-semibold tracking-tighter text-primary-500"
            >
              to escape hatch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
