"use client";

import Link from "next/link";
import { BotIcon } from "../icons";
import LeftNavigation from "./left-navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LeftPane() {
  const isMobile = useIsMobile();
  const { activeAgent } = useSelector((state: RootState) => state.agent);
  const { isOpen } = useSelector((state: RootState) => state.sider);

  return (
    <aside
      className={`
        w-64 bg-zinc-100 dark:bg-zinc-900 border-r dark:border-zinc-700 p-4 flex flex-col gap-4
        ${isMobile && isOpen ? "fixed top-0 left-0 h-full w-full z-40" : ""}
        ${isMobile && !isOpen ? "hidden" : ""}
      `}
    >
      <Link href="/">
        <div className={`flex flex-row items-center gap-2 ${isMobile ? "pr-[78px]" : ""}`}>
          <div className="border rounded-sm p-2 bg-white dark:bg-zinc-800">
            <BotIcon size={20} />
          </div>
          <div>
            <div className="text-md text-zinc-900 dark:text-zinc-100">Real Estate Assistant</div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Multi-Agent Support</span>
          </div>
        </div>
      </Link>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-md flex gap-2 justify-between items-start">
        <div className="text-sm">
          Active Agent <br />
          <div className="flex items-center gap-1 mt-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{activeAgent?.name}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="bg-green-500 text-xs text-white px-1.5 py-0.5 rounded">Online</span>
        </div>
      </div>
      <div className="border-b my-3" />
      <LeftNavigation />
    </aside>
  );
}