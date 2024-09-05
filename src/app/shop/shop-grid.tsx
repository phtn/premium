import { Tab, Tabs } from "@nextui-org/react";

export const ShopGrid = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <span>Photos</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <span>Music</span>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <span>Videos</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
