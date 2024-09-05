"use client";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import useDb from "./hooks";
import {
  type ComponentType,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import {
  type SelectCategory,
  type SelectProduct,
  type SelectUser,
} from "@/server/db/schema";
import { DB } from "@/app/ctx";

type ItemType = SelectUser | SelectCategory | SelectProduct;
type CardProps<T extends ItemType> = { item: T; children: ReactNode };
type CardComponent = ComponentType<CardProps<ItemType>>;

type PageData = {
  list: ItemType[] | undefined;
  fn: () => Promise<void>;
  IterCard: CardComponent;
};

export const ListContent = (props: { id: string }) => {
  const {
    getUsers,
    getCategories,
    getProducts,
    deleteUserById,
    deleteCategoryById,
    deleteProductById,
  } = useDb();

  const ctxDB = useContext(DB);

  const page = useCallback((): PageData => {
    switch (props.id) {
      case "user":
        return {
          list: ctxDB?.users,
          fn: getUsers,
          IterCard: UserCard as CardComponent,
        };
      case "category":
        return {
          list: ctxDB?.categories,
          fn: getCategories,
          IterCard: CatCard as CardComponent,
        };
      case "product":
        return {
          list: ctxDB?.products,
          fn: getProducts,
          IterCard: ProductCard as CardComponent,
        };
      default:
        return {
          list: ctxDB?.users,
          fn: getUsers,
          IterCard: UserCard as CardComponent,
        };
    }
  }, [
    props.id,
    getUsers,
    getProducts,
    getCategories,
    ctxDB?.users,
    ctxDB?.products,
    ctxDB?.categories,
  ]);

  const { list, fn, IterCard } = useMemo(() => page(), [page]);

  const handleDelete = useCallback(
    (item: ItemType) => async () => {
      if ("userId" in item) {
        await deleteUserById({ userId: item.userId });
      } else if ("categoryId" in item && "productId" in item) {
        await deleteProductById({ productId: item.productId });
        return;
      } else if ("categoryId" in item && "photoURL" in item) {
        await deleteCategoryById({ categoryId: item.categoryId });
      }
    },
    [deleteUserById, deleteCategoryById, deleteProductById],
  );

  return (
    <div className="h-screen w-full space-y-2 overflow-auto px-4 pb-[150px] pt-2">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium capitalize">{props.id} list</div>
        <div className="flex items-center space-x-3">
          <p>{list?.length}</p>
          <Button
            size="sm"
            onClick={fn}
            isIconOnly
            color="primary"
            variant="solid"
          >
            <ArrowPathIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {list?.map((item) => (
          <IterCard item={item} key={item.createdAt}>
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

export const UserCard = ({ item, children }: CardProps<SelectUser>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <CardHeader className="justify-between">
        <div className="flex gap-6">
          <Avatar isBordered radius="full" size="md" src={item.photoURL!} />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {item.displayName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {item.email}
            </h5>
          </div>
        </div>
        {children}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">ID</p>
          <p className=" text-small text-default-400">{item.userId}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">Joined</p>
          <p className="text-small text-default-400">{item.createdAt}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export const CatCard = ({ item, children }: CardProps<SelectCategory>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <CardHeader className="justify-between">
        <div className="flex gap-6">
          <Avatar isBordered radius="full" size="md" src={item.photoURL!} />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {item.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {item.categoryId}
            </h5>
          </div>
        </div>
        {children}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">by</p>
          <p className=" text-small text-default-400">{item.createdBy}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">live</p>
          <p className="text-small text-default-400">{item.liveMode}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export const ProductCard = ({ item, children }: CardProps<SelectProduct>) => {
  return (
    <Card className="max-w-[400px] p-3">
      <CardHeader className="justify-between">
        <div className="flex gap-6">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={"/svg/re-up_admin_logo.svg"}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {item.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {item.productId}
            </h5>
          </div>
        </div>
        {children}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {item.description}
        {item.remarks}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">by</p>
          <p className=" text-small text-default-400">{item.createdBy}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small font-semibold text-default-400">live</p>
          <p className="text-small text-default-400">{item.liveMode}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
