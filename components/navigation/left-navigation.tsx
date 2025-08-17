"use client";

import { setActiveAgent } from "@/redux/agentSlice";
import { toggleSider } from "@/redux/siderSlice";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

export default function LeftNavigation() {
  const { agents, activeAgent } = useSelector((state: RootState) => state.agent);
  const isActive = (agentId: string) => agentId === activeAgent?.id;
  const dispatch = useDispatch();

  const handleAgentClick = (agentId: string) => {
    dispatch(setActiveAgent(agentId));
    dispatch(toggleSider());
  };

  return (
    <div className="flex flex-col gap-3 flex-1 overflow-auto">
      <div className="text-sm">Select Agent</div>
      {
        agents.map((agent) => (
          <div 
            key={agent.id} 
            className={`p-4 rounded-md cursor-pointer border border-zinc-300 dark:border-zinc-800 ${isActive(agent.id) ? 'bg-white dark:bg-zinc-800 shadow-md' : ''}`} 
            onClick={() => handleAgentClick(agent.id)}
          >
            <div className="flex gap-2 justify-between items-center">
              <div className="text-sm border rounded-sm p-1 bg-zinc-200 dark:bg-zinc-600">
                {agent.nameIntials}
              </div>
              <div className="flex-1">
                <div className="text-sm">{agent.name}</div>
              </div>
            </div>
            <div className="text-xs/4 text-zinc-500 dark:text-zinc-400 mt-2">{agent.description}</div>
          </div>
        ))
      }
    </div>
  )
}