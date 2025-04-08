import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { browserHandlers } from '../handlers/browser.js';
import { groupHandlers } from '../handlers/group.js';
import { applicationHandlers } from '../handlers/application.js';
import { schemas } from '../types/schemas.js';
import { wrapHandler } from './handlerWrapper.js';
import { automationHandlers } from '../handlers/automation.js';

export function registerTools(server: McpServer) {
    // Browser tools
    server.tool('open-browser', 'Open the browser, both environment and profile mean browser', schemas.openBrowserSchema.shape, 
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
    
    // Automation tools
    server.tool('connect-browser-with-ws', 'Connect the browser with the ws url', schemas.createAutomationSchema.shape,
        wrapHandler(automationHandlers.connectBrowserWithWs));
    
    server.tool('open-new-page', 'Open a new page', schemas.emptySchema.shape,
        wrapHandler(automationHandlers.openNewPage));
        
    server.tool('navigate', 'Navigate to the url', schemas.navigateSchema.shape,
        wrapHandler(automationHandlers.navigate));

    server.tool('screenshot', 'Get the screenshot of the page', schemas.screenshotSchema.shape,
        wrapHandler(automationHandlers.screenshot));

    server.tool('get-page-visible-text', 'Get the visible text content of the page', schemas.emptySchema.shape,
        wrapHandler(automationHandlers.getPageVisibleText));

    server.tool('get-page-html', 'Get the html content of the page', schemas.emptySchema.shape,
        wrapHandler(automationHandlers.getPageHtml));

    server.tool('click-element', 'Click the element', schemas.clickElementSchema.shape,
        wrapHandler(automationHandlers.clickElement));

    server.tool('fill-input', 'Fill the input', schemas.fillInputSchema.shape,
        wrapHandler(automationHandlers.fillInput));

    server.tool('select-option', 'Select the option', schemas.selectOptionSchema.shape,
        wrapHandler(automationHandlers.selectOption));

    server.tool('hover-element', 'Hover the element', schemas.hoverElementSchema.shape,
        wrapHandler(automationHandlers.hoverElement));

    server.tool('scroll-element', 'Scroll the element', schemas.scrollElementSchema.shape,
        wrapHandler(automationHandlers.scrollElement));

    server.tool('press-key', 'Press the key', schemas.pressKeySchema.shape,
        wrapHandler(automationHandlers.pressKey));

    server.tool('evaluate-script', 'Evaluate the script', schemas.evaluateScriptSchema.shape,
        wrapHandler(automationHandlers.evaluateScript));
} 