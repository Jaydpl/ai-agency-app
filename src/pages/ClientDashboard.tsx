import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAgentStore } from '../store/agentStore';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AgentCard from '../components/AgentCard';
import TutorialHints from '../components/TutorialHints';
import '../styles/dashboard.css';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { agents, fetchAgents, loading } = useAgentStore();
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAgents(user.id);
    }
  }, [user, fetchAgents]);

  const tutorialHints = [
    {
      id: 'welcome',
      title: '👋 Welcome to AI Agency',
      description: 'Build powerful AI agents with our intuitive platform. Start by creating your first agent!',
      icon: '🚀',
      position: 'top' as const,
    },
    {
      id: 'create-agent',
      title: '🤖 Create New Agent',
      description: 'Click here to create a new AI agent with custom configurations and workflows.',
      icon: '✨',
      position: 'bottom' as const,
    },
    {
      id: 'dashboard-stats',
      title: '📊 Dashboard Stats',
      description: 'View your agent performance metrics and statistics here.',
      icon: '📈',
      position: 'bottom' as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleCreateAgent = () => {
    navigate('/agent-builder');
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      {showTutorial && (
        <TutorialHints
          hints={tutorialHints}
          onClose={(id) => {
            if (id === 'welcome') {
              setShowTutorial(false);
            }
          }}
        />
      )}

      <motion.div
        className="dashboard-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="dashboard-header" variants={itemVariants}>
          <div className="header-content">
            <h1>Agent Dashboard</h1>
            <p>Build and manage your intelligent AI agents</p>
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

        {/* Stats Section */}
        <motion.div className="dashboard-stats" variants={itemVariants}>
          <div className="stat-card">
            <div className="stat-icon">🤖</div>
            <div className="stat-content">
              <h3>Total Agents</h3>
              <p className="stat-value">{agents.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Active Agents</h3>
              <p className="stat-value">{agents.filter(a => a.status === 'active').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏸️</div>
            <div className="stat-content">
              <h3>Paused Agents</h3>
              <p className="stat-value">{agents.filter(a => a.status === 'paused').length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>Draft Agents</h3>
              <p className="stat-value">{agents.filter(a => a.status === 'draft').length}</p>
            </div>
          </div>
        </motion.div>

        {/* Agents Section */}
        {loading ? (
          <motion.div className="loading-container" variants={itemVariants}>
            <div className="loading-spinner"></div>
            <p>Loading your agents...</p>
          </motion.div>
        ) : agents.length === 0 ? (
          <motion.div className="empty-state" variants={itemVariants}>
            <div className="empty-icon">📭</div>
            <h2>No Agents Yet</h2>
            <p>Create your first AI agent to get started</p>
            <motion.button
              className="btn-primary"
              onClick={handleCreateAgent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Agent
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="agents-grid" variants={itemVariants}>
            <h2>Your Agents</h2>
            <div className="agents-list">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Tips Section */}
        {agents.length > 0 && (
          <motion.div className="quick-tips" variants={itemVariants}>
            <h3>💡 Quick Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <span className="tip-icon">🎯</span>
                <p>Define clear objectives for your agents to improve performance</p>
              </div>
              <div className="tip-card">
                <span className="tip-icon">🔗</span>
                <p>Connect multiple agents to create complex workflows</p>
              </div>
              <div className="tip-card">
                <span className="tip-icon">📊</span>
                <p>Monitor agent performance in real-time with analytics</p>
              </div>
              <div className="tip-card">
                <span className="tip-icon">🔧</span>
                <p>Customize agent behavior with advanced configuration options</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
