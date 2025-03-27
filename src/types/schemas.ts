import { z } from 'zod';

// Proxy Config Schema
const userProxyConfigSchema = z.object({
    proxy_soft: z.enum([
        'brightdata', 'brightauto', 'oxylabsauto', '922S5auto',
        'ipideeauto', 'ipfoxyauto', '922S5auth', 'kookauto',
        'ssh', 'other', 'no_proxy'
    ]).describe('The proxy soft of the browser'),
    proxy_type: z.enum(['http', 'https', 'socks5', 'no_proxy']).optional(),
    proxy_host: z.string().optional(),
    proxy_port: z.string().optional(),
    proxy_user: z.string().optional(),
    proxy_password: z.string().optional(),
    proxy_url: z.string().optional(),
    global_config: z.enum(['0', '1']).optional()
}).describe('The user proxy config of the browser');

// Browser Kernel Config Schema
const browserKernelConfigSchema = z.object({
    version: z.union([
        z.literal("92"), z.literal("99"), z.literal("102"),
        z.literal("105"), z.literal("108"), z.literal("110"),
        z.literal("113"), z.literal("116"), z.literal("120"),
        z.literal("126"), z.literal("130"), z.literal("134"),
        z.literal("ua_auto")
    ]).optional(),
    type: z.enum(['chrome', 'firefox']).optional()
}).optional();

// Random UA Config Schema
const randomUaConfigSchema = z.object({
    ua_version: z.array(z.string()).optional(),
    ua_system_version: z.array(
        z.enum([
            'Android 9', 'Android 10', 'Android 11', 'Android 12', 'Android 13',
            'iOS 14', 'iOS 15',
            'Windows 7', 'Windows 8', 'Windows 10', 'Windows 11',
            'Mac OS X 10', 'Mac OS X 11', 'Mac OS X 12', 'Mac OS X 13',
            'Linux'
        ])
    ).optional()
}).optional();

// Fingerprint Config Schema
const fingerprintConfigSchema = z.object({
    automatic_timezone: z.enum(['0', '1']).optional(),
    timezone: z.string().optional(),
    language: z.array(z.string()).optional(),
    flash: z.string().optional(),
    fonts: z.array(z.string()).optional(),
    webrtc: z.enum(['disabled', 'forward', 'proxy', 'local']).optional(),
    browser_kernel_config: browserKernelConfigSchema,
    random_ua: randomUaConfigSchema,
    tls_switch: z.enum(['0', '1']).optional(),
    tls: z.string().optional()
}).optional();

export const schemas = {
    // Browser Related Schema
    createBrowserSchema: z.object({
        domainName: z.string().optional(),
        openUrls: z.array(z.string()).optional(),
        cookie: z.string().optional(),
        username: z.string().optional(),
        password: z.string().optional(),
        system: z.string().optional(),
        groupId: z.string(),
        name: z.string().optional(),
        country: z.string().optional(),
        sysAppCateId: z.string().optional(),
        userProxyConfig: userProxyConfigSchema,
        fingerprintConfig: fingerprintConfigSchema,
        storageStrategy: z.number().optional()
    }),

    updateBrowserSchema: z.object({
        domainName: z.string().optional(),
        openUrls: z.array(z.string()).optional(),
        cookie: z.string().optional(),
        username: z.string().optional(),
        password: z.string().optional(),
        system: z.string().optional(),
        groupId: z.string(),
        name: z.string().optional(),
        country: z.string().optional(),
        sysAppCateId: z.string().optional(),
        userProxyConfig: userProxyConfigSchema,
        fingerprintConfig: fingerprintConfigSchema,
        storageStrategy: z.number().optional(),
        userId: z.string().describe('The user id of the browser to update')
    }),

    openBrowserSchema: z.object({
        serialNumber: z.string().optional().describe('The serial number of the browser to open'),
        userId: z.string().optional().describe('The browser id of the browser to open')
    }).strict(),

    closeBrowserSchema: z.object({
        userId: z.string().describe('The browser id of the browser to stop')
    }).strict(),

    deleteBrowserSchema: z.object({
        userIds: z.array(z.string()).describe('The user ids of the browsers to delete')
    }).strict(),

    getBrowserListSchema: z.object({
        groupId: z.string().optional().describe('The group id of the browser'),
        size: z.number().optional().describe('The size of the page'),
        id: z.string().optional().describe('The id of the browser'),
        serialNumber: z.string().optional().describe('The serial number of the browser'),
        sort: z.enum(['serial_number', 'last_open_time', 'created_time']).optional()
            .describe('The sort of the browser'),
        order: z.enum(['asc', 'desc']).optional()
            .describe('The order of the browser')
    }).strict(),

    moveBrowserSchema: z.object({
        groupId: z.string().describe('The target group id'),
        userIds: z.array(z.string()).describe('The browser ids to move')
    }).strict(),

    // Group Related Schema
    createGroupSchema: z.object({
        groupName: z.string().describe('The name of the group to create'),
        remark: z.string().optional().describe('The remark of the group')
    }).strict(),

    updateGroupSchema: z.object({
        groupId: z.string().describe('The id of the group to update'),
        groupName: z.string().describe('The new name of the group'),
        remark: z.string().nullable().optional().describe('The new remark of the group')
    }).strict(),

    getGroupListSchema: z.object({
        name: z.string().optional().describe('The name of the group'),
        size: z.number().optional().describe('The size of the page')
    }).strict(),

    // Application Related Schema
    getApplicationListSchema: z.object({
        size: z.number().optional().describe('The size of the page')
    }).strict(),

    // Empty Schema
    emptySchema: z.object({}).strict()
};

export type {
    CreateBrowserParams,
    UpdateBrowserParams,
    OpenBrowserParams,
    CloseBrowserParams,
    DeleteBrowserParams,
    GetBrowserListParams,
    MoveBrowserParams
} from './browser.js';

export type {
    CreateGroupParams,
    UpdateGroupParams,
    GetGroupListParams
} from './group.js';

export type {
    GetApplicationListParams
} from './application.js'; 