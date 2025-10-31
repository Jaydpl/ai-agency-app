import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mcpClient, MCPServer, MCPTool } from '../lib/mcp';
import '../styles/mcp-config.css';

interface MCPToolsConfigProps {
  onToolsSelected: (tools: string[]) => void;
  selectedTools?: string[];
}

export default function MCPToolsConfig({ onToolsSelected, selectedTools = [] }: MCPToolsConfigProps) {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [selectedServerTools, setSelectedServerTools] = useState<Set<string>>(
    new Set(selectedTools)
  );
  const [newServerUrl, setNewServerUrl] = useState('');
  const [newServerName, setNewServerName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing servers
    const existingServers = mcpClient.getServers();
    setServers(existingServers);
  }, []);

  const handleAddServer = async () => {
    if (!newServerUrl.trim() || !newServerName.trim()) {
      alert('Please enter both server name and URL');
      return;
    }

    setLoading(true);
    try {
      const serverId = `mcp-${Date.now()}`;
      const server = await mcpClient.connectToServer(serverId, newServerName, newServerUrl);
      setServers([...servers, server]);
      setNewServerUrl('');
      setNewServerName('');
    } catch (error) {
      console.error('Failed to add server:', error);
      alert('Failed to connect to MCP server');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveServer = (serverId: string) => {
    mcpClient.disconnectFromServer(serverId);
    setServers(servers.filter((s) => s.id !== serverId));
    
    // Remove tools from this server from selected tools
    const server = servers.find((s) => s.id === serverId);
    if (server) {
      const newSelected = new Set(selectedServerTools);
      server.tools.forEach((tool) => {
        newSelected.delete(`${serverId}:${tool.name}`);
      });
      setSelectedServerTools(newSelected);
      onToolsSelected(Array.from(newSelected));
    }
  };

  const handleToolToggle = (serverId: string, toolName: string) => {
    const toolId = `${serverId}:${toolName}`;
    const newSelected = new Set(selectedServerTools);
    
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
    } else {
      newSelected.add(toolId);
    }
    
    setSelectedServerTools(newSelected);
    onToolsSelected(Array.from(newSelected));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mcp-tools-config"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mcp-header">
        <h2>🔌 MCP Server Integration</h2>
        <p>Connect to MCP servers and select available tools for your agent</p>
      </div>

      {/* Add New Server */}
      <motion.div className="add-server-section" variants={itemVariants}>
        <h3>Add MCP Server</h3>
        <div className="add-server-form">
          <input
            type="text"
            placeholder="Server name (e.g., My Custom Server)"
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            className="form-input"
          />
          <input
            type="url"
            placeholder="Server URL (e.g., http://localhost:3000/mcp)"
            value={newServerUrl}
            onChange={(e) => setNewServerUrl(e.target.value)}
            className="form-input"
          />
          <motion.button
            className="btn-add-server"
            onClick={handleAddServer}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Connecting...' : '+ Add Server'}
          </motion.button>
        </div>
      </motion.div>

      {/* Connected Servers */}
      <motion.div className="servers-section" variants={itemVariants}>
        <h3>Connected Servers</h3>
        {servers.length === 0 ? (
          <div className="empty-servers">
            <p>No MCP servers connected yet</p>
            <small>Add a server above to get started</small>
          </div>
        ) : (
          <div className="servers-list">
            {servers.map((server) => (
              <motion.div
                key={server.id}
                className={`server-card status-${server.status}`}
                variants={itemVariants}
              >
                <div className="server-header">
                  <div className="server-info">
                    <h4>{server.name}</h4>
                    <p className="server-url">{server.url}</p>
                    <span className={`status-badge status-${server.status}`}>
                      {server.status === 'connected' && '🟢 Connected'}
                      {server.status === 'disconnected' && '🔴 Disconnected'}
                      {server.status === 'error' && '⚠️ Error'}
                    </span>
                  </div>
                  <motion.button
                    className="btn-remove-server"
                    onClick={() => handleRemoveServer(server.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Tools from this server */}
                {server.tools.length > 0 && (
                  <div className="server-tools">
                    <h5>Available Tools</h5>
                    <div className="tools-grid">
                      {server.tools.map((tool) => {
                        const toolId = `${server.id}:${tool.name}`;
                        const isSelected = selectedServerTools.has(toolId);

                        return (
                          <motion.div
                            key={tool.name}
                            className={`tool-item ${isSelected ? 'selected' : ''}`}
                            whileHover={{ backgroundColor: 'rgba(100, 200, 255, 0.15)' }}
                          >
                            <label className="tool-label">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToolToggle(server.id, tool.name)}
                              />
                              <span className="tool-name">{tool.name}</span>
                            </label>
                            <p className="tool-description">{tool.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Selected Tools Summary */}
      {selectedServerTools.size > 0 && (
        <motion.div className="selected-tools-summary" variants={itemVariants}>
          <h3>Selected Tools ({selectedServerTools.size})</h3>
          <div className="selected-tools-list">
            {Array.from(selectedServerTools).map((toolId) => (
              <motion.span
                key={toolId}
                className="selected-tool-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {toolId.split(':')[1]}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <motion.div className="mcp-info-box" variants={itemVariants}>
        <h4>ℹ️ About MCP Servers</h4>
        <p>
          MCP (Model Context Protocol) servers provide tools and capabilities for your agents.
          Connect to existing servers or set up your own to extend agent functionality.
        </p>
        <ul>
          <li>Web Search - Search the internet for information</li>
          <li>Code Execution - Run Python code safely</li>
          <li>File Access - Read and write files</li>
          <li>Custom Tools - Add your own server-provided tools</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
