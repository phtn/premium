import { Button, Tab, Tabs } from "@nextui-org/react";
import Json from "@/components/ui/json-view";
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
import { useAdminDB, useCatDB, useProductDB, useUserDB } from "./hook";
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

function AdminTab() {
  const { createAdmin, admin, validAdmin, adminInsert, adminLoading, error } =
    useAdminDB();
  const handleAdminInsert = () => adminInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/2.85)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <Header
          createFn={createAdmin}
          insertFn={handleAdminInsert}
          isLoading={adminLoading}
          isValid={validAdmin}
        />
        <div className="h-6" />
        <Result list={admin} error={error} />
      </div>
    </div>
  );
}
export const AdminContent = memo(AdminTab);

function UserTab() {
  const { createUser, user, validUser, userInsert, userLoading, error } =
    useUserDB();
  const handleUserInsert = () => userInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/2.85)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <Header
          createFn={createUser}
          insertFn={handleUserInsert}
          isLoading={userLoading}
          isValid={validUser}
        />
        <div className="h-6" />
        <Result list={user} error={error} />
      </div>
    </div>
  );
}
export const UserContent = memo(UserTab);

function CatTab() {
  const { createCat, cat, validCat, catInsert, catLoading, error } = useCatDB();
  const handleCatInsert = () => catInsert();
  return (
    <div className="overflow-auto md:w-[calc(100vw/2.85)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <Header
          createFn={createCat}
          insertFn={handleCatInsert}
          isLoading={catLoading}
          isValid={validCat}
        />
        <div className="h-6" />
        <Result list={cat} error={error} />
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
    <div className="overflow-auto md:w-[calc(100vw/2.85)]">
      <div className="h-[420px] overflow-auto rounded-xl bg-default-100/80 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
        <Header
          createFn={createProduct}
          insertFn={handleProductInsert}
          isLoading={productLoading}
          isValid={validProduct}
        />
        <div className="h-6" />
        <Result list={product} error={error} />
      </div>
    </div>
  );
}
export const ProductContent = memo(ProductTab);

const Title = (props: { title: string }) => (
  <div className="flex min-w-28 items-center justify-between space-x-4 whitespace-nowrap">
    <p className="text-xs font-medium capitalize tracking-tighter">
      {props.title} Schema
    </p>
    <HashtagIcon className="size-4 text-primary" />
  </div>
);

interface HeaderProps {
  createFn: VoidFunction;
  insertFn: VoidFunction;
  isLoading: boolean;
  isValid: boolean;
  children?: ReactNode;
}
const Header = ({
  createFn,
  insertFn,
  isLoading,
  isValid,
  children,
}: HeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Title title={"user"} />
      <Button
        size="sm"
        color="secondary"
        onClick={createFn}
        className="shadow-sm"
      >
        Create New
      </Button>
      <Button
        size="sm"
        className="shadow-sm"
        isLoading={isLoading}
        onClick={insertFn}
        disabled={!isValid}
        color={isValid ? "primary" : "default"}
      >
        Insert
      </Button>
      {children}
    </div>
  );
};

const Result = (props: {
  list: object | undefined;
  error: object | undefined;
}) => (
  <div>
    <Json src={{ ...props.list }} />
    {props.error ? <Json src={{ ...props.error }} /> : null}
  </div>
);

const tabs: CTRLTabItem[] = [
  {
    id: 3,
    href: "/master",
    value: "admin",
    label: "Admin",
    content: AdminContent,
  },
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
