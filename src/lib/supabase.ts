import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          description: string | null;
          agent_type: string;
          configuration: Record<string, any> | null;
          workflow_graph: Record<string, any> | null;
          status: 'draft' | 'active' | 'paused';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['agents']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['agents']['Insert']>;
      };
      agent_runs: {
        Row: {
          id: string;
          agent_id: string;
          start_time: string;
          end_time: string | null;
          status: 'running' | 'completed' | 'failed';
          input_data: Record<string, any> | null;
          output_data: Record<string, any> | null;
          log_data: Record<string, any> | null;
        };
        Insert: Omit<Database['public']['Tables']['agent_runs']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['agent_runs']['Insert']>;
      };
      tools: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          json_schema: Record<string, any>;
          admin_only: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tools']['Insert']>;
      };
      client_profiles: {
        Row: {
          id: string;
          organization_name: string | null;
          contact_email: string | null;
          is_admin: boolean;
          plan_level: string;
        };
        Insert: Database['public']['Tables']['client_profiles']['Row'];
        Update: Partial<Database['public']['Tables']['client_profiles']['Insert']>;
      };
    };
  };
};
