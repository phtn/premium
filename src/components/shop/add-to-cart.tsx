"use client";

import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    // Here you would typically call an API to add the item to the cart
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
    setIsAdding(false);
    alert("Product added to cart!");
  };

  console.log(productId);

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
