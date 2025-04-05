#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './utils/toolRegister.js';

// Create server instance
const server = new McpServer({
    name: 'adspower-local-api',
    version: '1.0.3',
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Register all tools
registerTools(server);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('AdsPower Local Api MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
