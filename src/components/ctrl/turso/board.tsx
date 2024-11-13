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
import { AdminContent, CatContent, ProductContent, UserContent } from "./tabs";

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
        id: 0,
        href: "/master",
        value: "admin",
        label: "Admin",
        content: AdminContent,
      },
      {
        id: 1,
        href: "/user",
        value: "user",
        label: "User",
        content: UserContent,
      },
      {
        id: 2,
        href: "/product",
        value: "product",
        label: "Product",
        content: ProductContent,
      },
      {
        id: 3,
        href: "/category",
        value: "category",
        label: "Category",
        content: CatContent,
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
      router.push(`/admin/testlab/${k}`);
      setSelected(k as string);
    },
    [router, setSelected],
  );

  return (
    <div className="flex w-full flex-col gap-4 tracking-tight">
      <Tabs
        // isVertical
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
