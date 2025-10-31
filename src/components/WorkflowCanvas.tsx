import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/workflow-canvas.css';

interface WorkflowCanvasProps {
  workflow: Record<string, any>;
  onChange: (workflow: Record<string, any>) => void;
}

interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
}

export default function WorkflowCanvas({ workflow, onChange }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(
    workflow.nodes || [
      { id: '1', type: 'start', label: 'Start', x: 50, y: 100 },
      { id: '2', type: 'action', label: 'Process', x: 250, y: 100 },
      { id: '3', type: 'end', label: 'End', x: 450, y: 100 },
    ]
  );

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
    };
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    onChange({ ...workflow, nodes: updatedNodes });
  };

  const deleteNode = (id: string) => {
    const updatedNodes = nodes.filter((n) => n.id !== id);
    setNodes(updatedNodes);
    onChange({ ...workflow, nodes: updatedNodes });
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    const updatedNodes = nodes.map((n) => (n.id === id ? { ...n, x, y } : n));
    setNodes(updatedNodes);
    onChange({ ...workflow, nodes: updatedNodes });
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start':
        return '#4ade80';
      case 'end':
        return '#ef4444';
      case 'action':
        return '#3b82f6';
      case 'decision':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  };

  return (
    <motion.div
      className="workflow-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="canvas-toolbar">
        <h3>Workflow Designer</h3>
        <div className="toolbar-buttons">
          <motion.button
            className="tool-btn"
            onClick={() => addNode('action')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Action
          </motion.button>
          <motion.button
            className="tool-btn"
            onClick={() => addNode('decision')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Decision
          </motion.button>
          <motion.button
            className="tool-btn"
            onClick={() => addNode('parallel')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Parallel
          </motion.button>
        </div>
      </div>

      <div className="canvas-area">
        <svg className="canvas-connections" width="100%" height="100%">
          {/* Draw connections between nodes */}
          {nodes.map((node, idx) => {
            if (idx < nodes.length - 1) {
              const nextNode = nodes[idx + 1];
              return (
                <line
                  key={`connection-${node.id}-${nextNode.id}`}
                  x1={node.x + 60}
                  y1={node.y + 30}
                  x2={nextNode.x}
                  y2={nextNode.y + 30}
                  stroke="rgba(100, 200, 255, 0.3)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            }
            return null;
          })}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="rgba(100, 200, 255, 0.3)" />
            </marker>
          </defs>
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`workflow-node ${selectedNode === node.id ? 'selected' : ''}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              backgroundColor: getNodeColor(node.type),
            }}
            draggable
            onDragStart={() => {
              setSelectedNode(node.id);
              setIsDragging(true);
            }}
            onDrag={(e) => {
              if (isDragging) {
                updateNodePosition(node.id, e.clientX - 30, e.clientY - 30);
              }
            }}
            onDragEnd={() => setIsDragging(false)}
            onContextMenu={(e) => {
              e.preventDefault();
              deleteNode(node.id);
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span>{node.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="canvas-info">
        <p>Drag nodes to reposition • Right-click to delete • Add nodes from toolbar</p>
      </div>
    </motion.div>
  );
}
