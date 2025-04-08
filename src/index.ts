#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './utils/toolRegister.js';
// import { getScreenshot } from './handlers/automation.js';
// Create server instance
const server = new McpServer({
    name: 'adspower-local-api',
    version: '1.0.5',
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Register all tools
registerTools(server);

// Resources
// server.resource('get-screenshot', 'Get the screenshot of the page', async (uri, extra) => {
//     const filename = uri.toString().split("://")[1];
//     const screenshot = getScreenshot(filename);
//     if (!screenshot) {
//         return {
//             contents: [],
//             mimeType: 'text/plain',
//         };
//     }
//     return {
//         contents: [{
//             uri: filename,
//             blob: screenshot,
//             mimeType: 'image/png',
//         }],
//     };
// });

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('AdsPower Local Api MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
