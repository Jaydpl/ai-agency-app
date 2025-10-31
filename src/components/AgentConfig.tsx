import { motion } from 'framer-motion';
import '../styles/agent-config.css';

interface AgentConfigProps {
  formData: {
    name: string;
    description: string;
    agent_type: 'chatbot' | 'manager_agent' | 'worker_agent';
    configuration: Record<string, any>;
  };
  setFormData: (data: any) => void;
}

export default function AgentConfig({ formData, setFormData }: AgentConfigProps) {
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfigChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [key]: value,
      },
    }));
  };

  return (
    <motion.div
      className="agent-config"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="config-section">
        <h2>Basic Information</h2>

        <div className="form-group">
          <label htmlFor="name">Agent Name *</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Customer Support Bot"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what this agent does..."
            className="form-textarea"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="agent_type">Agent Type *</label>
          <select
            id="agent_type"
            value={formData.agent_type}
            onChange={(e) => handleInputChange('agent_type', e.target.value)}
            className="form-select"
          >
            <option value="chatbot">Chatbot</option>
            <option value="manager_agent">Manager Agent</option>
            <option value="worker_agent">Worker Agent</option>
          </select>
        </div>
      </div>

      <div className="config-section">
        <h2>Configuration</h2>

        <div className="form-group">
          <label htmlFor="model">AI Model</label>
          <select
            id="model"
            value={formData.configuration.model || 'gpt-4'}
            onChange={(e) => handleConfigChange('model', e.target.value)}
            className="form-select"
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="temperature">Temperature (0-1)</label>
          <input
            id="temperature"
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={formData.configuration.temperature || 0.7}
            onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
            className="form-input"
          />
          <small>Higher values = more creative, lower = more deterministic</small>
        </div>

        <div className="form-group">
          <label htmlFor="max_tokens">Max Tokens</label>
          <input
            id="max_tokens"
            type="number"
            value={formData.configuration.max_tokens || 2000}
            onChange={(e) => handleConfigChange('max_tokens', parseInt(e.target.value))}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="system_prompt">System Prompt</label>
          <textarea
            id="system_prompt"
            value={formData.configuration.system_prompt || ''}
            onChange={(e) => handleConfigChange('system_prompt', e.target.value)}
            placeholder="Define the agent's behavior and personality..."
            className="form-textarea"
            rows={6}
          />
        </div>
      </div>

      <div className="config-section">
        <h2>Tools & Integrations</h2>
        <div className="tools-list">
          <motion.div
            className="tool-item"
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            <input type="checkbox" id="web_search" />
            <label htmlFor="web_search">Web Search</label>
          </motion.div>
          <motion.div
            className="tool-item"
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            <input type="checkbox" id="code_execution" />
            <label htmlFor="code_execution">Code Execution</label>
          </motion.div>
          <motion.div
            className="tool-item"
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            <input type="checkbox" id="file_access" />
            <label htmlFor="file_access">File Access</label>
          </motion.div>
          <motion.div
            className="tool-item"
            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.1)' }}
          >
            <input type="checkbox" id="mcp_integration" />
            <label htmlFor="mcp_integration">MCP Integration</label>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
