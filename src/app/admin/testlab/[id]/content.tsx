"use client";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import useDb from "./hooks";
import { type ComponentType, type ReactNode, useCallback } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import type {
  SelectAdmin,
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
import { DB, useCart } from "@/app/ctx";
import { type LineItem } from "@/server/paymongo/resource/zod.checkout";

type ItemType =
  | SelectUser
  | SelectCategory
  | SelectProduct
  | SelectAdmin
  | LineItem;
type CardProps<T extends ItemType> = { item: T; children: ReactNode };
type CardComponent = ComponentType<CardProps<ItemType>>;

// export type PageData = {
//   list: ItemType[] | undefined;
//   fn: () => Promise<void>;
//   IterCard: CardComponent;
// };

export const ListContent = (props: { id: string }) => {
  const {
    getUsers,
    getCategories,
    getProducts,
    deleteUserById,
    deleteCategoryById,
    deleteProductById,
    users,
    categories,
    products,
    loading,
    admins,
    getAdmins,
    deleteAdminById,
  } = useDb();

  const { itemList, getCartItems, deleteItem } = useCart();

  const page = () => {
    switch (props.id) {
      case "admin":
        return {
          list: admins,
          fn: getAdmins,
          IterCard: AdminCard as CardComponent,
        };
      case "user":
        return {
          list: users,
          fn: getUsers,
          IterCard: UserCard as CardComponent,
        };
      case "category":
        return {
          list: categories,
          fn: getCategories,
          IterCard: CatCard as CardComponent,
        };
      case "product":
        return {
          list: products,
          fn: getProducts,
          IterCard: ProductCard as CardComponent,
        };
      case "cart":
        return {
          list: itemList,
          fn: getCartItems,
          IterCard: CartItemCard as CardComponent,
        };
      default:
        return {
          list: users,
          fn: getUsers,
          IterCard: UserCard as CardComponent,
        };
    }
  };

  const { list, fn, IterCard } = page();

  const handleDelete = useCallback(
    (item: ItemType) => async () => {
      if ("userId" in item) {
        await deleteUserById({ userId: item.userId }).then(() => getUsers());
      } else if ("userId" in item && "master" in item) {
        await deleteAdminById({ userId: item.userId as string }).then(() =>
          getAdmins(),
        );
      } else if ("categoryId" in item && "productId" in item) {
        await deleteProductById({ productId: item.productId }).then(() =>
          getProducts(),
        );
      } else if ("categoryId" in item && "photoURL" in item) {
        await deleteCategoryById({ categoryId: item.categoryId }).then(() =>
          getCategories(),
        );
      } else if ("amount" in item) {
        await deleteItem(item.name).then(() => getCartItems());
      }
    },
    [
      deleteUserById,
      deleteCategoryById,
      deleteProductById,
      deleteAdminById,
      getCategories,
      getUsers,
      getProducts,
      getAdmins,
      deleteItem,
      getCartItems,
    ],
  );

  return (
    <DB.Provider value={{ users, categories, products, admins, loading }}>
      <div className="h-screen w-full space-y-2 overflow-auto px-4 pb-[150px] pt-2">
        <div className="flex items-center">
          <div className="w-[340px] text-xs font-medium capitalize">
            {props.id} list
          </div>
          <div className="flex items-center space-x-3">
            <p>{list?.length}</p>
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
          </div>
        </div>
        <div className="space-y-2">
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
    </DB.Provider>
  );
};

const AdminCard = ({ item, children }: CardProps<SelectAdmin>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={item.photoURL!}
        title={item.displayName}
        subtext={item.email}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
      <CardFooter className="gap-3">
        <Extra label="M" value={item.master ? "master" : "sub"} />
        <Extra label="by" value={item.createdBy} />
        <Extra label="id" value={item.userId} />
      </CardFooter>
    </Card>
  );
};

const UserCard = ({ item, children }: CardProps<SelectUser>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={item.photoURL!}
        title={item.displayName}
        subtext={item.email}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
      <CardFooter className="gap-3">
        <Extra label="ID" value={item.userId} />
        <Extra label="Joined" value={item.createdAt} />
      </CardFooter>
    </Card>
  );
};

const CatCard = ({ item, children }: CardProps<SelectCategory>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={item.photoURL!}
        title={item.name}
        subtext={item.categoryId}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3 tracking-tight">
        <Extra label="by" value={item.createdBy} />
        <Extra label="slug" value={item.slug} />
      </CardFooter>
    </Card>
  );
};

const ProductCard = ({ item, children }: CardProps<SelectProduct>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={"/svg/re-up_admin_logo.svg"}
        title={item.name}
        subtext={item.productId}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3">
        <Extra label="by" value={item.createdBy} />
        <Extra label="slug" value={item.slug} />
        <Extra label="cat" value={item.categoryId} />
      </CardFooter>
    </Card>
  );
};

const CartItemCard = ({ item, children }: CardProps<LineItem>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <Header
        avatar={"/svg/re-up_admin_logo.svg"}
        title={item.name}
        subtext={item.quantity}
      >
        {children}
      </Header>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
      </CardBody>
      <CardFooter className="gap-3">
        <Extra label="total amount" value={item.amount} />
        <Extra label="currency" value={item.currency} />
      </CardFooter>
    </Card>
  );
};

interface HeaderProps {
  avatar: string;
  title: string;
  subtext: string | number;
  children?: ReactNode;
}
const Header = ({ avatar, title, subtext, children }: HeaderProps) => (
  <CardHeader className="justify-between">
    <div className="flex gap-6">
      <Avatar isBordered radius="full" size="md" src={avatar} />
      <div className="flex flex-col items-start justify-center gap-1">
        <h4 className="text-small font-semibold leading-none text-default-600">
          {title}
        </h4>
        <h5 className="text-small tracking-tight text-default-400">
          {subtext}
        </h5>
      </div>
    </div>
    {children}
  </CardHeader>
);

const Extra = (props: {
  label: string;
  value: string | number | boolean | null | undefined;
}) => (
  <div className="flex gap-1 text-xs">
    <p className="font-medium text-default-600">{props.label}</p>
    <p className="text-default-400">{props.value}</p>
  </div>
);
