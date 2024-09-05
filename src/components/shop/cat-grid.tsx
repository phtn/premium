"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { PauseIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { type SelectCategory } from "@/server/db/schema";

export default function CategoryGrid({
  categories,
}: {
  categories: SelectCategory[];
}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/shop/electronics");
  });
  return (
    <div className="px-4">
      <div className="flex items-center space-x-0.5 py-2 text-gray-800">
        <PauseIcon className="size-[11px] opacity-40" />
        <h2 className="text-xs font-bold uppercase tracking-widest opacity-60">
          Categories
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, i) => (
          <Button
            as={Link}
            href={`/shop/${category.name}`}
            key={category.categoryId}
            size="lg"
            variant="shadow"
            color={i === 0 ? "primary" : "warning"}
            className="group flex h-14 w-full items-center justify-start space-x-1 rounded-sm transition-shadow hover:bg-primary hover:shadow-sm"
          >
            <RectangleGroupIcon className="size-6" />
            <div className=" flex h-14 flex-col justify-center">
              <h2 className="text-lg tracking-tighter group-hover:text-white">
                {category.name}
              </h2>
              <p className="text-xs font-light tracking-tight group-hover:text-white">
                Explore {category.name}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
