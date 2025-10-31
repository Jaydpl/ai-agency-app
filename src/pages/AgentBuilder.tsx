import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAgentStore, Agent } from '../store/agentStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import WorkflowCanvas from '../components/WorkflowCanvas';
import AgentConfig from '../components/AgentConfig';
import '../styles/agent-builder.css';

export default function AgentBuilder() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { agents, createAgent, updateAgent, setCurrentAgent, currentAgent, loading } = useAgentStore();

  const [activeTab, setActiveTab] = useState<'config' | 'workflow'>('config');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    agent_type: 'chatbot' as const,
    configuration: {},
    workflow_graph: {},
  });

  useEffect(() => {
    if (agentId && agents.length > 0) {
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
        setCurrentAgent(agent);
        setFormData({
          name: agent.name,
          description: agent.description || '',
          agent_type: agent.agent_type as any,
          configuration: agent.configuration || {},
          workflow_graph: agent.workflow_graph || {},
        });
      }
    }
  }, [agentId, agents, setCurrentAgent]);

  const handleSave = async () => {
    if (!user) {
      toast.error('You must be logged in to save agents');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Agent name is required');
      return;
    }

    setIsSaving(true);
    try {
      const agentData = {
        client_id: user.id,
        ...formData,
        status: 'draft' as const,
      };

      if (currentAgent) {
        await updateAgent(currentAgent.id, agentData);
        toast.success('Agent updated successfully!');
      } else {
        const newAgent = await createAgent(agentData);
        setCurrentAgent(newAgent);
        toast.success('Agent created successfully!');
        navigate(`/agent-builder/${newAgent.id}`);
      }
    } catch (error) {
      console.error('Failed to save agent:', error);
      toast.error('Failed to save agent. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleActivate = async () => {
    if (!currentAgent) return;
    
    setIsSaving(true);
    try {
      await updateAgent(currentAgent.id, { status: 'active' });
      toast.success('Agent activated!');
    } catch (error) {
      toast.error('Failed to activate agent');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePause = async () => {
    if (!currentAgent) return;
    
    setIsSaving(true);
    try {
      await updateAgent(currentAgent.id, { status: 'paused' });
      toast.success('Agent paused');
    } catch (error) {
      toast.error('Failed to pause agent');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="agent-builder-container">
      <Navbar onLogout={handleLogout} />

      <div className="builder-content">
        <motion.div
          className="builder-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-left">
            <motion.button
              className="btn-back"
              onClick={() => navigate('/dashboard')}
              whileHover={{ x: -5 }}
            >
              ← Back
            </motion.button>
            <div>
              <h1>{currentAgent ? 'Edit Agent' : 'Create New Agent'}</h1>
              {currentAgent && (
                <p className="agent-status">Status: <span className={`status-${currentAgent.status}`}>{currentAgent.status}</span></p>
              )}
            </div>
          </div>
          <div className="header-buttons">
            {currentAgent && (
              <>
                {currentAgent.status !== 'active' && (
                  <motion.button
                    className="btn-activate"
                    onClick={handleActivate}
                    disabled={isSaving}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSaving ? 'Activating...' : '▶ Activate'}
                  </motion.button>
                )}
                {currentAgent.status === 'active' && (
                  <motion.button
                    className="btn-pause"
                    onClick={handlePause}
                    disabled={isSaving}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSaving ? 'Pausing...' : '⏸ Pause'}
                  </motion.button>
                )}
              </>
            )}
            <motion.button
              className="btn-save"
              onClick={handleSave}
              disabled={isSaving || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSaving ? 'Saving...' : '💾 Save Agent'}
            </motion.button>
          </div>
        </motion.div>

        <div className="builder-tabs">
          <motion.button
            className={`tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            ⚙️ Configuration
          </motion.button>
          <motion.button
            className={`tab ${activeTab === 'workflow' ? 'active' : ''}`}
            onClick={() => setActiveTab('workflow')}
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            🔄 Workflow
          </motion.button>
        </div>

        <motion.div
          className="builder-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'config' ? (
            <AgentConfig formData={formData} setFormData={setFormData} />
          ) : (
            <WorkflowCanvas
              workflow={formData.workflow_graph}
              onChange={(workflow) =>
                setFormData((prev) => ({ ...prev, workflow_graph: workflow }))
              }
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
