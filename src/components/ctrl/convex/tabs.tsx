import { memo, type PropsWithChildren, type ReactNode } from "react";
import { useAdminDB, useCatDB, useProductDB, useUserDB } from "./hook";
import Json from "@/components/ui/json-view";
import { Button } from "@nextui-org/button";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/app/ctx/cart";

function AdminTab() {
  const { createAdmin, admin, validAdmin, adminInsert, adminLoading, error } =
    useAdminDB();
  const handleAdminInsert = () => adminInsert();
  return (
    <Wrapper>
      <Header
        createFn={createAdmin}
        insertFn={handleAdminInsert}
        isLoading={adminLoading}
        isValid={validAdmin}
      />
      <Result list={admin} error={error} />
    </Wrapper>
  );
}
export const AdminContent = memo(AdminTab);

function UserTab() {
  const { createUser, user, validUser, userInsert, userLoading, error } =
    useUserDB();
  const handleUserInsert = () => userInsert();
  return (
    <Wrapper>
      <Header
        createFn={createUser}
        insertFn={handleUserInsert}
        isLoading={userLoading}
        isValid={validUser}
      />
      <div className="h-6" />
      <Result list={user} error={error} />
    </Wrapper>
  );
}
export const UserContent = memo(UserTab);

function CatTab() {
  const { cat, validCat, catInsert, catLoading, error } = useCatDB();
  const handleCatInsert = () => catInsert();
  return (
    <Wrapper>
      <Header
        createFn={() => null}
        insertFn={handleCatInsert}
        isLoading={catLoading}
        isValid={validCat}
        title="Category"
      />
      <div className="h-6" />
      <Result list={cat} error={error} />
    </Wrapper>
  );
}
export const CatContent = memo(CatTab);

function ProductTab() {
  const {
    createProduct,
    prod,
    validProduct,
    productInsert,
    productLoading,
    error,
  } = useProductDB();
  const handleProductInsert = () => productInsert();
  return (
    <Wrapper>
      <Header
        createFn={createProduct}
        insertFn={handleProductInsert}
        isLoading={productLoading}
        isValid={validProduct}
        title={"Product"}
      />
      <div className="h-6" />
      <Result list={{ prod }} error={error} />
    </Wrapper>
  );
}
export const ProductContent = memo(ProductTab);

function CartTab() {
  const { loading, cartData } = useCart();
  const handleCartReset = () => {
    console.log("");
  };
  const handleCreate = () => {
    console.log("");
  };
  return (
    <Wrapper>
      <Header
        createFn={handleCreate}
        insertFn={handleCartReset}
        isLoading={loading}
        isValid={true}
      />
      <div className="h-6" />
      <Result list={cartData?.data.attributes} error={undefined} />
    </Wrapper>
  );
}
export const CartContent = memo(CartTab);

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="w-4/5 overflow-auto">
    <div className="h-fit w-full overflow-auto rounded-xl bg-primary-50 px-6 py-4 shadow-inner shadow-default-100 portrait:-ml-5 portrait:w-screen">
      {children}
    </div>
  </div>
);

const Title = (props: { title?: string }) => (
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
  title?: string;
}
const Header = ({
  createFn,
  insertFn,
  isLoading,
  children,
  title,
}: HeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Title title={title} />
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
        color={"primary"}
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
  <div className="h-fit w-full">
    <Json src={{ ...props.list }} />
    {props.error ? <Json src={{ ...props.error }} /> : null}
  </div>
);
