import agents, { Agent } from '@/lib/agents'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AgentState {
  agents: Agent[]
  activeAgent: Agent | null
}

const initialState: AgentState = {
  agents,
  activeAgent: agents?.[0] || null,
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setActiveAgent: (state, action: PayloadAction<string | null>) => {
      state.activeAgent = state.agents.find(agent => agent.id === action.payload) || null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveAgent } = agentSlice.actions

export default agentSlice.reducer