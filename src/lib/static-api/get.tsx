import type { Category, Product } from "@/types/shop";

// Simulated database or API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    slug: "electronics/laptop",
    src: "src",
    price: 999,
  },
  {
    id: "2",
    name: "Smartphone",
    slug: "electronics/smartphone",
    src: "src",
    price: 699,
  },
  {
    id: "3",
    name: "Running Shoes",
    slug: "sports/running-shoes",
    src: "src",
    price: 129,
  },
  // ... more products
];

const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics" },
  { id: "2", name: "Sports", slug: "sports" },
  // ... more categories
];

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(100); // Simulate API delay
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  await delay(100); // Simulate API delay
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getAllProducts(): Promise<Product[]> {
  await delay(100); // Simulate API delay
  return products;
}

export async function getAllCategories(): Promise<Category[]> {
  await delay(100); // Simulate API delay
  return categories;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  await delay(100); // Simulate API delay
  return products.filter((p) => p.slug.startsWith(categorySlug));
}
