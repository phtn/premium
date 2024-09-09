"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { type SelectCategory } from "@/server/db/schema";

export default function CategoryGrid({
  categories,
}: {
  categories: SelectCategory[];
}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/shop/bath");
  });
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, i) => (
          <Button
            as={Link}
            href={`/shop/${category.slug}`}
            key={category.categoryId}
            size="lg"
            variant="shadow"
            color={i === 0 ? "primary" : "warning"}
            className="group flex h-14 w-full items-center justify-start space-x-1 rounded-sm transition-shadow hover:bg-primary hover:shadow-sm"
          >
            <div className=" flex h-14 flex-col justify-center">
              <h2 className="text-lg capitalize tracking-tighter group-hover:text-white">
                {category.slug}
              </h2>
              <p className="text-xs font-light capitalize tracking-tight group-hover:text-white">
                Explore {category.slug}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
