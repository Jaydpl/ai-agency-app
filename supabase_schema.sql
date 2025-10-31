-- ============================================================================
-- AI AGENCY APP - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- This schema defines all tables, views, and security policies for the
-- AI Agency application. Execute this SQL in your Supabase SQL Editor.
-- ============================================================================

-- 1. AGENTS TABLE
-- Stores the definition of each AI agent created by clients
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  agent_type text NOT NULL CHECK (agent_type IN ('chatbot', 'manager_agent', 'worker_agent')),
  configuration jsonb,
  workflow_graph jsonb,
  status text DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'active', 'paused')),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. AGENT RUNS TABLE
-- Logs every execution or "run" of an agent
CREATE TABLE IF NOT EXISTS agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  start_time timestamp with time zone DEFAULT now() NOT NULL,
  end_time timestamp with time zone,
  status text NOT NULL CHECK (status IN ('running', 'completed', 'failed')),
  input_data jsonb,
  output_data jsonb,
  log_data jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 3. TOOLS TABLE
-- Stores definitions of tools available to agents
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  json_schema jsonb NOT NULL,
  admin_only boolean DEFAULT FALSE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 4. CLIENT PROFILES TABLE
-- Additional metadata for clients (beyond auth.users)
CREATE TABLE IF NOT EXISTS client_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name text,
  contact_email text,
  is_admin boolean DEFAULT FALSE NOT NULL,
  plan_level text DEFAULT 'basic' NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_agents_client_id ON agents(client_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_agent_id ON agent_runs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_status ON agent_runs(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_created_at ON agent_runs(created_at);
CREATE INDEX IF NOT EXISTS idx_client_profiles_is_admin ON client_profiles(is_admin);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- AGENTS TABLE POLICIES
-- ============================================================================

-- Clients can view their own agents
CREATE POLICY "Clients can view their own agents" ON agents
  FOR SELECT USING (auth.uid() = client_id);

-- Clients can insert their own agents
CREATE POLICY "Clients can insert their own agents" ON agents
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Clients can update their own agents
CREATE POLICY "Clients can update their own agents" ON agents
  FOR UPDATE USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

-- Clients can delete their own agents
CREATE POLICY "Clients can delete their own agents" ON agents
  FOR DELETE USING (auth.uid() = client_id);

-- Admins can view all agents
CREATE POLICY "Admins can view all agents" ON agents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid()
      AND client_profiles.is_admin = true
    )
  );

-- ============================================================================
-- AGENT RUNS TABLE POLICIES
-- ============================================================================

-- Clients can view runs for their own agents
CREATE POLICY "Clients can view their own agent runs" ON agent_runs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agents
      WHERE agents.id = agent_runs.agent_id
      AND agents.client_id = auth.uid()
    )
  );

-- Clients can insert runs for their own agents
CREATE POLICY "Clients can insert agent runs" ON agent_runs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM agents
      WHERE agents.id = agent_runs.agent_id
      AND agents.client_id = auth.uid()
    )
  );

-- Admins can view all agent runs
CREATE POLICY "Admins can view all agent runs" ON agent_runs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid()
      AND client_profiles.is_admin = true
    )
  );

-- ============================================================================
-- CLIENT PROFILES TABLE POLICIES
-- ============================================================================

-- Clients can view their own profile
CREATE POLICY "Clients can view their own profile" ON client_profiles
  FOR SELECT USING (auth.uid() = id);

-- Clients can update their own profile
CREATE POLICY "Clients can update their own profile" ON client_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON client_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid()
      AND client_profiles.is_admin = true
    )
  );

-- ============================================================================
-- TOOLS TABLE POLICIES
-- ============================================================================

-- All authenticated users can view available tools
CREATE POLICY "All users can view tools" ON tools
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can insert tools
CREATE POLICY "Admins can insert tools" ON tools
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid()
      AND client_profiles.is_admin = true
    )
  );

-- Only admins can update tools
CREATE POLICY "Admins can update tools" ON tools
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM client_profiles
      WHERE client_profiles.id = auth.uid()
      AND client_profiles.is_admin = true
    )
  );

-- ============================================================================
-- FUNCTIONS FOR AUTOMATIC TIMESTAMP UPDATES
-- ============================================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for agents table
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for client_profiles table
CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTION TO CREATE CLIENT PROFILE ON SIGNUP
-- ============================================================================

-- Create function to automatically create client profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.client_profiles (id, contact_email, is_admin, plan_level)
  VALUES (new.id, new.email, false, 'basic');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Insert sample tools
INSERT INTO tools (name, description, json_schema, admin_only)
VALUES
  (
    'web_search',
    'Search the web for information',
    '{"type": "object", "properties": {"query": {"type": "string"}}}',
    false
  ),
  (
    'code_execution',
    'Execute Python code',
    '{"type": "object", "properties": {"code": {"type": "string"}}}',
    false
  ),
  (
    'file_access',
    'Read and write files',
    '{"type": "object", "properties": {"path": {"type": "string"}, "operation": {"type": "string"}}}',
    false
  ),
  (
    'mcp_integration',
    'Integrate with MCP servers',
    '{"type": "object", "properties": {"server_url": {"type": "string"}, "method": {"type": "string"}}}',
    false
  )
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================
-- Your database schema is now ready for the AI Agency application!
-- All tables, indexes, RLS policies, and triggers have been created.
