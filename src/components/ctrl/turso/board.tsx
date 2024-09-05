import { Button, Tab, Tabs } from "@nextui-org/react";
import Json from "react-json-view";
import {
  type MemoExoticComponent,
  type ReactElement,
  type ReactNode,
  type Key,
  useState,
  useCallback,
  memo,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { useCatDB, useProductDB, useUserDB } from "./hook";
import { HashtagIcon } from "@heroicons/react/24/outline";

export interface CTRLTabItem {
  id: string | number;
  value: Key;
  label: string;
  href: string;
  content: MemoExoticComponent<() => ReactElement>;
}
export interface CTRLTabProps {
  children?: ReactNode;
}
export function CTRLBoard({ children }: CTRLTabProps) {
  const pathname = usePathname().split("/")[3];
  const [selected, setSelected] = useState<string>(pathname!);
  const router = useRouter();

  const handleSelect = useCallback(
    (k: Key) => {
      router.push(`/admin/testlab/${k}`);
      setSelected(k as string);
    },
    [router, setSelected],
  );

  return (
    <div className="flex w-full flex-col gap-4 tracking-tight">
      <Tabs
        isVertical
        defaultSelectedKey={"user"}
        selectedKey={selected}
        onSelectionChange={handleSelect}
        items={tabs}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} title={tab.label}>
            <tab.content />
          </Tab>
        ))}
      </Tabs>
      {children}
    </div>
  );
}

function UserTab() {
  const { createUser, user, validUser, userInsert, userLoading } = useUserDB();
  const handleUserInsert = () => userInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/3)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <div className="flex items-center space-x-4">
          <div className="flex min-w-36 items-center justify-between space-x-4">
            <p className="text-xs font-medium tracking-tighter">User Schema</p>
            <HashtagIcon className="size-4 text-primary" />
          </div>
          <Button
            size="sm"
            color="secondary"
            onClick={createUser}
            className="shadow-sm"
          >
            Create New
          </Button>
          <Button
            size="sm"
            className="shadow-sm"
            isLoading={userLoading}
            onClick={handleUserInsert}
            disabled={!validUser}
            color={validUser ? "primary" : "default"}
          >
            Insert
          </Button>
        </div>
        <div className="h-6" />

        <Json theme={"rjv-default"} src={{ ...user }} />
      </div>
    </div>
  );
}
export const UserContent = memo(UserTab);

function CatTab() {
  const { createCat, cat, validCat, catInsert, catLoading, error } = useCatDB();
  const handleCatInsert = () => catInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/3)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <div className="flex items-center space-x-4">
          <div className="flex min-w-36 items-center justify-between space-x-4">
            <p className="text-xs font-medium tracking-tighter">
              Category Schema
            </p>
            <HashtagIcon className="size-4 text-primary" />
          </div>
          <Button
            size="sm"
            color="secondary"
            onClick={createCat}
            className="shadow-sm"
          >
            Create New
          </Button>
          <Button
            size="sm"
            className="shadow-sm"
            isLoading={catLoading}
            onClick={handleCatInsert}
            disabled={!validCat}
            color={validCat ? "primary" : "default"}
          >
            Insert
          </Button>
        </div>
        <div className="h-6" />
        <Json theme={"rjv-default"} src={{ ...cat }} />
        {error ? <Json theme={"rjv-default"} src={{ ...error }} /> : null}
      </div>
    </div>
  );
}
export const CatContent = memo(CatTab);

function ProductTab() {
  const {
    createProduct,
    product,
    validProduct,
    productInsert,
    productLoading,
    error,
  } = useProductDB();
  const handleProductInsert = () => productInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/3)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <div className="flex items-center space-x-4">
          <div className="flex min-w-36 items-center justify-between space-x-4">
            <p className="text-xs font-medium tracking-tighter">
              Product Schema
            </p>
            <HashtagIcon className="size-4 text-primary" />
          </div>
          <Button
            size="sm"
            color="secondary"
            onClick={createProduct}
            className="shadow-sm"
          >
            Create New
          </Button>
          <Button
            size="sm"
            className="shadow-sm"
            isLoading={productLoading}
            onClick={handleProductInsert}
            disabled={!validProduct}
            color={validProduct ? "primary" : "default"}
          >
            Insert
          </Button>
        </div>
        <div className="h-6" />
        <Json theme={"rjv-default"} src={{ ...product }} />
        {error ? <Json theme={"rjv-default"} src={{ ...error }} /> : null}
      </div>
    </div>
  );
}
export const ProductContent = memo(ProductTab);

const tabs: CTRLTabItem[] = [
  {
    id: 0,
    href: "/user",
    value: "user",
    label: "User",
    content: UserContent,
  },
  {
    id: 1,
    href: "/product",
    value: "product",
    label: "Product",
    content: ProductContent,
  },
  {
    id: 2,
    href: "/category",
    value: "category",
    label: "Category",
    content: CatContent,
  },
];
