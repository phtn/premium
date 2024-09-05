import { Tab, Tabs } from "@nextui-org/react";
import { type StickyScrollContent } from "./sticky-reveal";
import { ElderScroll } from "@/components/app/scroll";

export interface TabItem {
  id: string | number;
  value: string;
  label: string;
  content: StickyScrollContent[];
}
export interface TabCompProps {
  items: TabItem[];
}

export function TabComp({ items }: TabCompProps) {
  return (
    <div className="flex w-full flex-col gap-4 tracking-tight md:items-center">
      <Tabs>
        {items.map((item, i) => (
          <Tab key={i} title={item.label} titleValue={item.value}>
            <div className="portrait:-ml-5 portrait:w-screen">
              <ElderScroll content={item.content} />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
