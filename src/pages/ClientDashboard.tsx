import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAgentStore } from '../store/agentStore';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AgentCard from '../components/AgentCard';
import '../styles/dashboard.css';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { agents, fetchAgents, loading } = useAgentStore();

  useEffect(() => {
    if (user) {
      fetchAgents(user.id);
    }
  }, [user, fetchAgents]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleCreateAgent = () => {
    navigate('/agent-builder');
  };

  return (
    <div className="dashboard-container">
      <Navbar onLogout={handleLogout} />

      <div className="dashboard-content">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1>Agent Dashboard</h1>
            <p>Build and manage your AI agents</p>
          </div>
          <motion.button
            className="btn-primary"
            onClick={handleCreateAgent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Create New Agent
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : agents.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>No agents yet</h2>
            <p>Create your first AI agent to get started</p>
            <motion.button
              className="btn-primary"
              onClick={handleCreateAgent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Agent
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="agents-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
