import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Agent } from '../store/agentStore';
import '../styles/agent-card.css';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'chatbot':
        return '💬';
      case 'manager_agent':
        return '👔';
      case 'worker_agent':
        return '🔧';
      default:
        return '🤖';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4ade80';
      case 'paused':
        return '#facc15';
      case 'draft':
        return '#64748b';
      default:
        return '#6b7280';
    }
  };

  return (
    <motion.div
      className="agent-card"
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(100, 200, 255, 0.2)' }}
      onClick={() => navigate(`/agent-builder/${agent.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <div className="agent-icon">{getAgentIcon(agent.agent_type)}</div>
        <div className="status-badge" style={{ backgroundColor: getStatusColor(agent.status) }}>
          {agent.status}
        </div>
      </div>

      <div className="card-content">
        <h3>{agent.name}</h3>
        <p className="agent-description">{agent.description || 'No description'}</p>
        <div className="agent-meta">
          <span className="agent-type">{agent.agent_type.replace('_', ' ')}</span>
          <span className="agent-date">
            {new Date(agent.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <motion.div
        className="card-footer"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.button
          className="btn-edit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
