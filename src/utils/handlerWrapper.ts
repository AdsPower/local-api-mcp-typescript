import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export function wrapHandler(handler: Function) {
    return async (params: any): Promise<CallToolResult> => {
        try {
            const content = await handler(params);
            if (typeof content === 'string') {
                return {
                    content: [{
                        type: 'text' as const,
                        text: content
                    }]
                };
            }
            return {
                content
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