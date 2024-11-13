import { Tab, Tabs } from "@nextui-org/react";
import {
  type MemoExoticComponent,
  type ReactElement,
  type ReactNode,
  type Key,
  useState,
  useCallback,
  useMemo,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { CatContent, ProductContent } from "./tabs";
import { CategoryForm } from "./forms/category";

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

  const tabs: CTRLTabItem[] = useMemo(
    () => [
      {
        id: 2,
        href: "/category",
        value: "category",
        label: "Category",
        content: CategoryForm,
      },
      {
        id: 3,
        href: "/product",
        value: "product",
        label: "Product",
        content: ProductContent,
      },

      {
        id: 4,
        href: "/cart",
        value: "cart",
        label: "Cart",
        content: CatContent,
      },
    ],
    [],
  );

  const handleSelect = useCallback(
    (k: Key) => {
      router.push(`/admin/add/${k}`);
      setSelected(k as string);
    },
    [router, setSelected],
  );

  return (
    <div className="flex w-2/3 flex-col gap-x-6 tracking-tight">
      <Tabs
        items={tabs}
        color="primary"
        variant="underlined"
        defaultSelectedKey={"category"}
        selectedKey={selected}
        onSelectionChange={handleSelect}
        classNames={{
          tab: "font-medium",
        }}
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
