import {
  redisGetCart,
  redisGetLike,
  redisSetCart,
  redisSetLike,
} from "@/lib/redis/caller";
import type { Product } from "@/server/db/zod.product";
import type {
  Attributes,
  LineItem,
} from "@/server/paymongo/resource/zod.checkout";
import type { RedisCartData } from "@/server/redis/cart";
import type { LikeAttributes, RedisLikeData } from "@/server/redis/like";
import { errHandler, generateRef, Ok, toggleState } from "@/utils/helpers";
import { useCallback, useMemo, useState } from "react";

export const useProductDetail = (
  userId: string | undefined,
  email: string | undefined | null,
) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [quantity, setQuantity] = useState(1);
  const [incart, setIncart] = useState(true);
  const [liked, setLiked] = useState(false);

  const incrQty = () => {
    setIncart(true);
    setQuantity((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const decrQty = () => {
    setIncart(true);
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const toggleLike = (attribs: LikeAttributes) => () => {
    createRedisLike(userId, attribs)
      .then(Ok(setLoading, "Updated your favorites!"))
      .catch(errHandler(setLoading, setError));
    console.log(attribs);
    toggleState(setLiked);
  };
  const toggleIncart = () => setIncart(true);

  const getAmount = useCallback(() => {
    if (!product?.price) return 0;
    const amount = product.price * quantity;
    return amount;
  }, [quantity, product?.price]);

  const createDescription = useCallback(() => {
    if (!product) return;
    const description =
      product.description +
      `--${product.product_id}|>${product.name}|>${product.brand}|>${product.price}|>${product.photo_url}|>${product.in_stock}|>${product.category}|>${product.subcategory}|>${product.size}|>${product.count}|>${product.count_unit}|>${product.weight}|>${product.weight_unit}**`;
    return description;
  }, [product]);

  const line_item = useMemo(
    (): LineItem => ({
      currency: "PHP",
      amount: getAmount(),
      description: createDescription() ?? "Item description",
      name: product?.name ?? "Product Name",
      quantity,
    }),
    [quantity, createDescription, getAmount, product?.name],
  );

  const attributes = useMemo((): Attributes => {
    const line_items: LineItem[] = [{ ...line_item }];
    return {
      ...attribDefaults,
      description: `Purchase: ${Date.now().toString(36)}`,
      line_items: line_items,
      reference_number: generateRef().toUpperCase(),
      statement_descriptor: `${email ?? "no descriptor"}`,
    };
  }, [line_item, email]);

  const createRedisCart = async () => {
    setLoading(true);
    if (!userId) return;
    const index = (await redisGetCart(`cart_${userId}`)) as
      | RedisCartData[]
      | null;

    if (!index) {
      return await redisSetCart({
        key: `cart_${userId}`,
        dollar: "$",
        data: {
          data: {
            attributes,
          },
          updated: Date.now(),
        },
      }).then(Ok(setLoading, "Items added to cart"));
    }

    const lineItems = index[0]?.data.attributes.line_items;
    const updatedLineItems = collectLineItems(lineItems!, line_item);

    if (!updatedLineItems) return;

    return await redisSetCart({
      key: `cart_${userId}`,
      dollar: "$",
      data: {
        data: {
          attributes: {
            ...attribDefaults,
            description: `Purchase: ${Date.now().toString(36)}`,
            line_items: updatedLineItems,
            reference_number: generateRef().toUpperCase(),
            statement_descriptor: `${email ?? "no descriptor"}`,
          },
        },
        updated: Date.now(),
      },
    }).then(Ok(setLoading, "Cart items updated."));
  };

  const addToCart = async () => {
    setLoading(true);
    if (!product) {
      setLoading(false);
      return;
    }
    setIncart(false);
    setQuantity(1);
    await createRedisCart().catch(errHandler);
  };

  return {
    quantity,
    liked,
    loading,
    incrQty,
    decrQty,
    toggleLike,
    setProduct,
    addToCart,
    incart,
    toggleIncart,
    error,
  };
};

const createRedisLike = async (
  userId: string | undefined,
  attribs: LikeAttributes,
) => {
  if (!userId) return;
  const type = userId.includes("guest") ? "guest" : "user";
  const index = (await redisGetLike(`like_${userId}`)) as
    | RedisLikeData[]
    | null;

  if (!index) {
    return await redisSetLike({
      key: `like_${userId}`,
      dollar: "$",
      data: {
        userId,
        type,
        likes: [{ ...attribs, createdAt: Date.now() }],
        updatedAt: Date.now(),
      },
    });
  }

  const likes = index[0]?.likes;
  likes?.push(attribs);
  const data = {
    userId,
    type,
    likes,
    updatedAt: Date.now(),
  } as RedisLikeData;

  return await redisSetLike({ key: `like_${userId}`, dollar: "$", data });
};

export const attribDefaults: Omit<
  Attributes,
  "line_items" | "description" | "reference_number" | "statement_descriptor"
> = {
  send_email_receipt: false,
  show_description: true,
  show_line_items: true,
  cancel_url: "https://re-up.ph",
  success_url: "https://re-up.ph",
  payment_method_types: [
    "gcash",
    "card",
    // "brankas_bdo",
    // "dob_ubp",
    // "brankas_landbank",
    // "brankas_metrobank",
    "grab_pay",
    "paymaya",
    // "dob",
  ],
};

export function upsertLineItem(
  array: LineItem[],
  name: string | undefined,
  updates: Partial<LineItem>,
): LineItem[] | null {
  const index = array.findIndex((item) => item.name === name);

  if (index === -1) {
    console.log(`Object with id ${name} not found. Appending new object.`);
    return [...array, { name, ...updates } as LineItem];
  }

  const currentObject = array[index];
  const hasChanges = Object.keys(updates).some(
    (key) =>
      updates[key as keyof LineItem] !== currentObject?.[key as keyof LineItem],
  );

  if (!hasChanges) {
    console.log(`No changes detected for object with id ${name}`);
    return null;
  }

  const updatedObject = { ...currentObject, ...updates };
  return [
    ...array.slice(0, index),
    updatedObject,
    ...array.slice(index + 1),
  ] as LineItem[];
}

function collectLineItems(
  existingItems: LineItem[],
  newItem: LineItem,
): LineItem[] {
  // Create a flag to check if the item was found
  let itemFound = false;

  // Loop through existing line items
  const updatedItems = existingItems.map((item) => {
    if (item.name === newItem.name) {
      // If a match is found, update the quantity and amount
      itemFound = true;
      const updatedQuantity = item.quantity + newItem.quantity;
      const updatedAmount = updatedQuantity * item.amount; // Recalculate amount
      return { ...item, quantity: updatedQuantity, amount: updatedAmount };
    }
    return item; // Return the item unchanged if no match
  });

  // If no match was found, append the new item
  if (!itemFound) {
    updatedItems.push({
      ...newItem,
      amount: newItem.quantity * newItem.amount, // Calculate the amount for the new item
    });
  }

  return updatedItems;
}
