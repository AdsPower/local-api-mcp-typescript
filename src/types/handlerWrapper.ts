export function wrapHandler(handler: Function) {
    return async (params: any) => {
        try {
            const result = await handler(params);
            return {
                content: [{
                    type: 'text',
                    text: result
                }]
            };
        } catch (error) {
            return {
                content: [{
                    type: 'text',
                    text: error instanceof Error ? error.message : String(error)
                }]
            };
        }
    };
} 