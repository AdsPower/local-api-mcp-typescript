import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export function wrapHandler(handler: Function) {
    return async (params: any): Promise<CallToolResult> => {
        try {
            const result = await handler(params);
            return {
                content: [{
                    type: 'text' as const,
                    text: result
                }]
            };
        } catch (error) {
            return {
                content: [{
                    type: 'text' as const,
                    text: error instanceof Error ? error.message : String(error)
                }]
            };
        }
    };
} 