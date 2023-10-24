import React from "react";
import { Switch } from "@nextui-org/react";
import { useSidebarStore, BreakPoint } from "@/app/stores/useSidebarStore";

export const SidebarSwitch = () => {
  const { toggleBreakPoint, breakPoint } = useSidebarStore();

  return (
    <div className="flex gap-4">
      <Switch
        defaultSelected={breakPoint === BreakPoint.MD}
        size="md"
        onChange={() => toggleBreakPoint()}
      >
        Fixed
      </Switch>
    </div>
  );
};
