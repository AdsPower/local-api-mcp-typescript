import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { browserHandlers } from '../handlers/browser.js';
import { groupHandlers } from '../handlers/group.js';
import { applicationHandlers } from '../handlers/application.js';
import { schemas } from '../types/schemas.js';
import { wrapHandler } from './handlerWrapper.js';

export function registerTools(server: McpServer) {
    // Browser tools
    server.tool('open-browser', 'Open the browser', schemas.openBrowserSchema.shape, 
        wrapHandler(browserHandlers.openBrowser));
    
    server.tool('close-browser', 'Close the browser', schemas.closeBrowserSchema.shape,
        wrapHandler(browserHandlers.closeBrowser));
    
    server.tool('create-browser', 'Create a browser', schemas.createBrowserSchema.shape,
        wrapHandler(browserHandlers.createBrowser));
    
    server.tool('update-browser', 'Update the browser', schemas.updateBrowserSchema.shape,
        wrapHandler(browserHandlers.updateBrowser));
    
    server.tool('delete-browser', 'Delete the browser', schemas.deleteBrowserSchema.shape,
        wrapHandler(browserHandlers.deleteBrowser));
    
    server.tool('get-browser-list', 'Get the list of browsers', schemas.getBrowserListSchema.shape,
        wrapHandler(browserHandlers.getBrowserList));
    
    server.tool('get-opened-browser', 'Get the list of opened browsers', schemas.emptySchema.shape,
        wrapHandler(browserHandlers.getOpenedBrowser));
    
    server.tool('move-browser', 'Move browsers to a group', schemas.moveBrowserSchema.shape,
        wrapHandler(browserHandlers.moveBrowser));

    // Group tools
    server.tool('create-group', 'Create a browser group', schemas.createGroupSchema.shape,
        wrapHandler(groupHandlers.createGroup));
    
    server.tool('update-group', 'Update the browser group', schemas.updateGroupSchema.shape,
        wrapHandler(groupHandlers.updateGroup));
    
    server.tool('get-group-list', 'Get the list of groups', schemas.getGroupListSchema.shape,
        wrapHandler(groupHandlers.getGroupList));

    // Application tools
    server.tool('get-application-list', 'Get the list of applications', schemas.getApplicationListSchema.shape,
        wrapHandler(applicationHandlers.getApplicationList));
} 