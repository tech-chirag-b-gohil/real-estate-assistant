"use client";

import { Button } from "../ui/button";
import { MoonIcon, SunIcon, ArrowUpIcon } from "../icons";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useIsMobile } from "@/hooks/use-mobile";
import { toggleSider } from "@/redux/siderSlice";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const { activeAgent } = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  const handleToggleSider = () => {
    // Dispatch an action to toggle the sider
    dispatch(toggleSider());
  };

  return (
    <div className="p-2 flex flex-row gap-2 justify-between items-center bg-white dark:bg-zinc-800 border-b dark:border-zinc-700 pr-[86px]">
      <div className="flex gap-2 justify-between items-center">
        {
          isMobile && (
            <div className="transform -rotate-90 cursor-pointer" onClick={handleToggleSider}>
              <ArrowUpIcon />
            </div>
          )
        }
        <div className="text-sm border rounded-sm p-1 bg-zinc-200 dark:bg-zinc-600 relative">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 absolute -right-1 -bottom-1" />
          {activeAgent?.nameIntials}
        </div>
        <div className="flex-1">
          <div className="text-sm">{activeAgent?.name}</div>
          <div className="text-xs/4 text-zinc-500 dark:text-zinc-400">{activeAgent?.description}</div>
        </div>
      </div>
    </div>
  );
};
