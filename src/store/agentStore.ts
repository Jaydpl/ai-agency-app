import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Agent {
  id: string;
  client_id: string;
  name: string;
  description: string | null;
  agent_type: 'chatbot' | 'manager_agent' | 'worker_agent';
  configuration: Record<string, any> | null;
  workflow_graph: Record<string, any> | null;
  status: 'draft' | 'active' | 'paused';
  created_at: string;
  updated_at: string;
}

interface AgentState {
  agents: Agent[];
  currentAgent: Agent | null;
  loading: boolean;
  error: string | null;
  fetchAgents: (clientId: string) => Promise<void>;
  createAgent: (agent: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => Promise<Agent>;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  setCurrentAgent: (agent: Agent | null) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  currentAgent: null,
  loading: false,
  error: null,

  fetchAgents: async (clientId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('client_id', clientId);

      if (error) throw error;
      set({ agents: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createAgent: async (agent) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('agents')
        .insert([agent])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        agents: [...state.agents, data],
      }));

      return data;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateAgent: async (id: string, updates) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id ? { ...agent, ...updates } : agent
        ),
        currentAgent:
          state.currentAgent?.id === id
            ? { ...state.currentAgent, ...updates }
            : state.currentAgent,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteAgent: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        agents: state.agents.filter((agent) => agent.id !== id),
        currentAgent: state.currentAgent?.id === id ? null : state.currentAgent,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
}));
