# MCP Integration Guide

This guide explains how to integrate Model Context Protocol (MCP) servers with the AI Agency Agent Builder.

## What is MCP?

The **Model Context Protocol (MCP)** is an open standard for connecting AI models to external tools and data sources. It enables agents to:

- Access web search capabilities
- Execute code safely
- Read and write files
- Interact with APIs
- Use custom tools
- Extend functionality dynamically

## Architecture

The MCP integration consists of three main components:

### 1. MCP Client (`src/lib/mcp.ts`)
Handles communication with MCP servers:
- Server connection management
- Tool discovery and registration
- Tool execution
- Error handling

### 2. MCP Tools Config Component (`src/components/MCPToolsConfig.tsx`)
UI for managing MCP servers:
- Add/remove servers
- Browse available tools
- Select tools for agents
- Visual server status

### 3. Agent Configuration Integration
Agents can use selected tools during execution:
- Tools stored in agent configuration
- Tools available during agent runs
- Tool execution with parameters

## Setting Up MCP Servers

### Option 1: Using Default MCP Server

The application comes with a default MCP server configuration:

```typescript
const DEFAULT_MCP_SERVERS = [
  {
    id: 'mcp-default',
    name: 'Default MCP Server',
    url: 'http://localhost:3000/mcp',
  },
];
```

To use the default server:
1. Ensure your MCP server is running at `http://localhost:3000/mcp`
2. The server will be automatically discovered
3. Available tools will be loaded from the server

### Option 2: Adding Custom MCP Servers

To add a custom MCP server:

1. **In the Agent Builder:**
   - Go to the Configuration tab
   - Scroll to "MCP Server Integration"
   - Enter server name and URL
   - Click "+ Add Server"

2. **Server Requirements:**
   - Must implement MCP protocol
   - Must expose tools via `/tools` endpoint
   - Must support JSON-RPC 2.0

### Option 3: Programmatic Server Addition

```typescript
import { mcpClient } from './lib/mcp';

// Connect to server
const server = await mcpClient.connectToServer(
  'my-server-id',
  'My Custom Server',
  'http://my-server.com/mcp'
);

// Get all tools from server
const tools = server.tools;

// Call a tool
const result = await mcpClient.callTool(
  'my-server-id',
  'tool_name',
  { param1: 'value1' }
);
```

## Available Tools

### Built-in Tools

The default MCP server provides these tools:

#### 1. Web Search
Search the internet for information
```json
{
  "name": "web_search",
  "description": "Search the web for information",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {"type": "string"}
    },
    "required": ["query"]
  }
}
```

#### 2. Code Execution
Execute Python code safely
```json
{
  "name": "execute_code",
  "description": "Execute Python code",
  "inputSchema": {
    "type": "object",
    "properties": {
      "code": {"type": "string"}
    },
    "required": ["code"]
  }
}
```

#### 3. File Access
Read and write files
```json
{
  "name": "file_access",
  "description": "Read and write files",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": {"type": "string"},
      "operation": {"type": "string"}
    },
    "required": ["path", "operation"]
  }
}
```

#### 4. Get Weather
Get current weather information
```json
{
  "name": "get_weather",
  "description": "Get current weather for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {"type": "string"}
    },
    "required": ["location"]
  }
}
```

## Creating Custom MCP Servers

### Server Structure

A basic MCP server should implement:

```typescript
// server.ts
import express from 'express';

const app = express();

// Define your tools
const tools = [
  {
    name: 'my_tool',
    description: 'Does something useful',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string' }
      },
      required: ['input']
    }
  }
];

// Expose tools endpoint
app.get('/mcp/tools', (req, res) => {
  res.json(tools);
});

// Handle tool execution
app.post('/mcp/execute', (req, res) => {
  const { tool, params } = req.body;
  
  // Execute tool logic
  const result = executeToolLogic(tool, params);
  
  res.json({ result });
});

app.listen(3000);
```

### Example: Custom Calculator Server

```typescript
const tools = [
  {
    name: 'calculate',
    description: 'Perform mathematical calculations',
    inputSchema: {
      type: 'object',
      properties: {
        expression: { type: 'string' },
        precision: { type: 'number' }
      },
      required: ['expression']
    }
  }
];

function executeCalculate(params) {
  try {
    const result = eval(params.expression);
    return {
      success: true,
      result: params.precision 
        ? result.toFixed(params.precision)
        : result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Using Tools in Agents

### Selecting Tools

1. **In Agent Builder:**
   - Go to Configuration tab
   - Find "MCP Server Integration"
   - Connect to desired MCP server
   - Select tools to enable

2. **In Agent Configuration:**
   ```typescript
   const agentConfig = {
     name: 'My Agent',
     tools: [
       'mcp-default:web_search',
       'mcp-default:execute_code'
     ]
   };
   ```

### Tool Execution

When an agent executes, it can call tools:

```typescript
// During agent execution
const toolResult = await mcpClient.callTool(
  'mcp-default',
  'web_search',
  { query: 'latest AI news' }
);
```

## Security Considerations

### 1. Server Validation
- Only connect to trusted MCP servers
- Verify server SSL certificates in production
- Implement authentication if needed

### 2. Tool Permissions
- Review tool capabilities before enabling
- Restrict dangerous operations (code execution)
- Implement rate limiting

### 3. Data Privacy
- Don't send sensitive data to external servers
- Use encrypted connections (HTTPS)
- Implement data retention policies

### 4. Sandboxing
- Run code execution in isolated environments
- Use containers or VMs for untrusted code
- Implement timeout limits

## Troubleshooting

### Server Connection Failed
**Problem:** Cannot connect to MCP server
**Solution:**
- Verify server URL is correct
- Check server is running
- Verify network connectivity
- Check CORS settings if cross-origin

### Tools Not Loading
**Problem:** Server connected but no tools available
**Solution:**
- Verify server implements `/tools` endpoint
- Check server response format
- Review browser console for errors
- Test with `curl` or Postman

### Tool Execution Fails
**Problem:** Tool runs but returns error
**Solution:**
- Check tool parameters match schema
- Verify required parameters provided
- Review tool error message
- Check server logs

### Performance Issues
**Problem:** Tool execution is slow
**Solution:**
- Check network latency
- Optimize server response time
- Implement caching
- Use async execution

## Best Practices

1. **Server Management**
   - Use reliable, well-maintained servers
   - Monitor server health
   - Implement fallback servers
   - Document server dependencies

2. **Tool Selection**
   - Only enable needed tools
   - Review tool documentation
   - Test tools before production
   - Monitor tool usage

3. **Error Handling**
   - Implement retry logic
   - Provide meaningful error messages
   - Log tool execution
   - Monitor failure rates

4. **Performance**
   - Cache tool results when possible
   - Use async execution
   - Implement timeouts
   - Monitor response times

## API Reference

### MCPClient Methods

```typescript
// Connect to server
connectToServer(id: string, name: string, url: string): Promise<MCPServer>

// Disconnect from server
disconnectFromServer(id: string): void

// Get all servers
getServers(): MCPServer[]

// Get specific server
getServer(id: string): MCPServer | undefined

// Call a tool
callTool(serverId: string, toolName: string, params: object): Promise<any>

// Get all tools
getAllTools(): MCPTool[]

// Find tool by name
findTool(toolName: string): {server: MCPServer, tool: MCPTool} | undefined
```

### Types

```typescript
interface MCPServer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  tools: MCPTool[];
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
}

interface MCPRequest {
  method: string;
  params?: Record<string, any>;
  jsonrpc: string;
  id: string | number;
}

interface MCPResponse {
  jsonrpc: string;
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}
```

## Examples

### Example 1: Web Search Agent

```typescript
const agent = {
  name: 'Research Agent',
  type: 'worker_agent',
  tools: ['mcp-default:web_search'],
  systemPrompt: 'You are a research assistant. Use web_search to find information.'
};
```

### Example 2: Code Analysis Agent

```typescript
const agent = {
  name: 'Code Analyzer',
  type: 'worker_agent',
  tools: ['mcp-default:execute_code', 'mcp-default:file_access'],
  systemPrompt: 'You are a code analysis expert. Execute code and analyze files.'
};
```

### Example 3: Multi-Server Agent

```typescript
const agent = {
  name: 'Multi-Tool Agent',
  type: 'manager_agent',
  tools: [
    'mcp-default:web_search',
    'custom-server:special_analysis',
    'weather-server:get_weather'
  ],
  systemPrompt: 'You coordinate multiple tools to solve complex problems.'
};
```

## Resources

- [MCP Specification](https://modelcontextprotocol.io)
- [MCP GitHub Repository](https://github.com/anthropics/mcp)
- [Tool Development Guide](https://modelcontextprotocol.io/docs/tools)
- [Server Implementation Examples](https://github.com/anthropics/mcp/tree/main/examples)

## Support

For issues with MCP integration:
1. Check this guide for solutions
2. Review server logs
3. Test with MCP CLI tools
4. Contact MCP community

---

**Happy integrating!** 🚀
