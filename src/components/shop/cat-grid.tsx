"use client";
import Link from "next/link";
import type { Category } from "@/types/shop";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/shop/electronics");
  });
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          href={`/shop/${category.slug}`}
          key={category.id}
          className="group block rounded-lg border p-6 transition-shadow hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold group-hover:text-blue-600">
            {category.name}
          </h2>
          <p className="text-gray-600">Explore {category.name}</p>
        </Link>
      ))}
    </div>
  );
}
