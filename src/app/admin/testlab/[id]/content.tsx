"use client";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type ComponentType, type ReactNode, useCallback } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { type LineItem } from "@/server/paymongo/resource/zod.checkout";
import { formatAsMoney } from "@/utils/helpers";
import { useCart } from "@/app/ctx/cart";
import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { type api } from "@vex/api";
import { type Category } from "@/server/db/zod.category";
import { type Product } from "@/server/db/zod.product";

type ItemType = Category | Product | LineItem;
type CardProps<T extends ItemType> = { item: T; children: ReactNode };
type CardComponent = ComponentType<CardProps<ItemType>>;

// export type PageData = {
//   list: ItemType[] | undefined;
//   fn: () => Promise<void>;
//   IterCard: CardComponent;
// };

interface TestLabContentProps {
  id: string;
  preloadedProducts: Preloaded<typeof api.products.get.all>;
  preloadedCategories: Preloaded<typeof api.categories.get.all>;
}
export const TestLabContent = ({
  id,
  preloadedProducts,
  preloadedCategories,
}: TestLabContentProps) => {
  const products = usePreloadedQuery(preloadedProducts);
  const categories = usePreloadedQuery(preloadedCategories);
  const { product, category } = useVex();

  const { itemList, getCartItems, deleteItem, loading } = useCart();

  const { user } = useAuthCtx();

  const page = () => {
    switch (id) {
      case "admin":
        return {
          list: products,
          fn: product.get.all,
          IterCard: ProductCard as CardComponent,
        };
      case "user":
        return {
          list: categories,
          fn: category.get.all,
          IterCard: CatCard as CardComponent,
        };
      case "category":
        return {
          list: categories,
          fn: category.get.all,
          IterCard: CatCard as CardComponent,
        };
      case "product":
        return {
          list: products,
          fn: product.get.all,
          IterCard: ProductCard as CardComponent,
        };
      case "cart":
        return {
          list: itemList,
          fn: () => {
            if (user?.uid) {
              return getCartItems(user.uid);
            }
          },
          IterCard: CartItemCard as CardComponent,
        };
      default:
        return {
          list: products,
          fn: product.get.all,
          IterCard: ProductCard as CardComponent,
        };
    }
  };

  const { list, fn, IterCard } = page();

  type Ent = Product | Category | LineItem;
  const handleDelete = useCallback(
    (item: Ent) => async () => {
      function isProduct(ent: Ent): ent is Product {
        return "product_id" in ent;
      }
      function isCategory(ent: Ent): ent is Category {
        return "category_id" in ent;
      }
      function isCart(ent: Ent): ent is LineItem {
        return "name" in ent;
      }
      if (isProduct(item)) {
        await product.delete.byId(item.product_id);
      } else if (isCategory(item)) {
        await category.delete.byId(item.category_id);
      } else if (isCart(item)) {
        await deleteItem(item.name);
      }
    },
    [category.delete, product.delete, deleteItem],
  );

  return (
    <div className="h-screen w-full space-y-2 overflow-auto pb-[150px] pt-2">
      <div className="flex items-center px-6">
        <div className="w-full text-xs font-medium capitalize">{id} list</div>
        <section className="flex items-center space-x-4">
          <div className="flex items-center rounded-xl bg-slate-200/60 px-3 py-2 font-mono text-sm font-medium opacity-60">
            <span>{list?.length}</span>
            <span className="pl-2 text-xs font-light">items</span>
          </div>
          <Button
            isLoading={loading}
            size="sm"
            onClick={fn}
            isIconOnly
            color="default"
            variant="flat"
          >
            <ArrowPathIcon className="size-4" />
          </Button>
        </section>
      </div>
      <div className="w-full space-y-2 px-4">
        {list?.map((item, i) => (
          <IterCard item={item} key={i}>
            <Button
              isIconOnly
              color="default"
              radius="full"
              variant={"flat"}
              size="sm"
              onClick={handleDelete(item)}
            >
              <TrashIcon className="size-4" />
            </Button>
          </IterCard>
        ))}
      </div>
    </div>
  );
};

// const AdminCard = ({ item, children }: CardProps<Product>) => {
//   return (
//     <Card className="max-w-[400px] p-3">
//       <Header avatar={item.photo_url} title={item.name} subtext={item.price}>
//         {children}
//       </Header>
//       <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
//       <CardFooter className="gap-3">
//         {/* <Extra label="M" value={item.master ? "master" : "sub"} /> */}
//         <Extra label="by" value={item.created_by} />
//         <Extra label="id" value={item.price} />
//       </CardFooter>
//     </Card>
//   );
// };

// const UserCard = ({ item, children }: CardProps<Category>) => {
//   return (
//     <Card className="max-w-[400px] p-3">
//       <Header avatar={item.photo_url} title={item.name} subtext={100}>
//         {children}
//       </Header>
//       <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
//       <CardFooter className="gap-3">
//         <Extra label="ID" value={item.updated_by} />
//         <Extra label="Joined" value={item.updated_at} />
//       </CardFooter>
//     </Card>
//   );
// };

const CatCard = ({ item, children }: CardProps<Category>) => {
  return (
    <Card className="w-full p-3">
      <Header
        avatar={item.photo_url}
        title={item.name}
        subtext={item.category_id}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3 tracking-tight">
        <Extra label="by" value={item.created_by} />
        <Extra label="slug" value={item.slug} />
      </CardFooter>
    </Card>
  );
};

const ProductCard = ({ item, children }: CardProps<Product>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={"/svg/re-up_admin_logo.svg"}
        title={item.name}
        subtext={item.product_id}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3">
        <Extra label="by" value={item.created_by} />
        <Extra label="slug" value={item.slug} />
        <Extra label="cat" value={item.category_id} />
      </CardFooter>
    </Card>
  );
};

const CartItemCard = ({ item, children }: CardProps<LineItem>) => {
  const meco = item.description.split("--");
  const stageSep = meco[1]?.split("|>");
  const [id, name, brand, price, image, stock] = stageSep!;
  return (
    <Card className="max-w-[400px] p-3">
      <Header avatar={image} title={item.name} subtext={formatAsMoney(+price!)}>
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-xs">
        <div className="flex items-center space-x-6 opacity-60">
          <div>
            {name}
            {meco[0]}
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <Extra label="id" value={id} />
        <Extra label="brand" value={brand} />
        <Extra label="stock" value={stock} />
        <Extra label="qty" value={item.quantity} />
        <Extra label="amount" value={item.amount} />
      </CardFooter>
    </Card>
  );
};

interface HeaderProps {
  avatar: string | undefined;
  title: string;
  subtext: string | number;
  children?: ReactNode;
}
const Header = ({ avatar, title, subtext, children }: HeaderProps) => (
  <CardHeader className="justify-between">
    <div className="flex gap-6">
      <Avatar isBordered radius="full" size="md" src={avatar} />
      <div className="flex flex-col items-start justify-center gap-1">
        <h4 className="text-xs font-semibold leading-none text-default-600">
          {title}
        </h4>
        <h5 className="text-xs text-default-500">{subtext}</h5>
      </div>
    </div>
    {children}
  </CardHeader>
);

const Extra = (props: {
  label: string;
  value: string | number | boolean | null | undefined;
}) => (
  <div className="flex gap-1 whitespace-nowrap text-xs">
    <p className="font-medium text-default-600">{props.label}</p>
    <p className="max-w-[8ch] overflow-clip font-light text-default-500">
      {props.value}
    </p>
  </div>
);
