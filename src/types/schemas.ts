import { z } from 'zod';

// Proxy Config Schema
const userProxyConfigSchema = z.object({
    proxy_soft: z.enum([
        'brightdata', 'brightauto', 'oxylabsauto', '922S5auto',
        'ipideeauto', 'ipfoxyauto', '922S5auth', 'kookauto',
        'ssh', 'other', 'no_proxy'
    ]).describe('The proxy soft of the browser'),
    proxy_type: z.enum(['http', 'https', 'socks5', 'no_proxy']).optional(),
    proxy_host: z.string().optional().describe('The proxy host of the browser, eg: 127.0.0.1'),
    proxy_port: z.string().optional().describe('The proxy port of the browser, eg: 8080'),
    proxy_user: z.string().optional().describe('The proxy user of the browser, eg: user'),
    proxy_password: z.string().optional().describe('The proxy password of the browser, eg: password'),
    proxy_url: z.string().optional().describe('The proxy url of the browser, eg: http://127.0.0.1:8080'),
    global_config: z.enum(['0', '1']).optional().describe('The global config of the browser, default is 0')
}).describe('The user proxy config of the browser');

// Browser Kernel Config Schema
const browserKernelConfigSchema = z.object({
    version: z.union([
        z.literal("92"), z.literal("99"), z.literal("102"),
        z.literal("105"), z.literal("108"), z.literal("111"),
        z.literal("114"), z.literal("115"), z.literal("116"),
        z.literal("117"), z.literal("118"), z.literal("119"),
        z.literal("120"), z.literal("121"), z.literal("122"),
        z.literal("123"), z.literal("124"), z.literal("125"),
        z.literal("126"), z.literal("127"), z.literal("128"),
        z.literal("129"), z.literal("130"), z.literal("131"),
        z.literal("132"), z.literal("133"), z.literal("134"),
        z.literal("ua_auto")
    ]).optional().describe('The version of the browser, default is ua_auto'),
    type: z.enum(['chrome', 'firefox']).optional().describe('The type of the browser, default is chrome')
}).optional().describe('The browser kernel config of the browser, default is version: ua_auto, type: chrome');

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
    ).optional().describe('The ua system version of the browser, eg: ["Android 9", "iOS 14"]')
}).optional().describe('The random ua config of the browser, default is ua_version: [], ua_system_version: []');

// Fingerprint Config Schema
const fingerprintConfigSchema = z.object({
    automatic_timezone: z.enum(['0', '1']).optional().describe('The automatic timezone of the browser, default is 0'),
    timezone: z.string().optional().describe('The timezone of the browser, eg: Asia/Shanghai'),
    language: z.array(z.string()).optional().describe('The language of the browser, eg: ["en-US", "zh-CN"]'),
    flash: z.enum(['block', 'allow']).optional().describe('The flash of the browser, default is disabled'),
    fonts: z.array(z.string()).optional().describe('The fonts of the browser, eg: ["Arial", "Times New Roman"]'),
    webrtc: z.enum(['disabled', 'forward', 'proxy', 'local']).optional().describe('The webrtc of the browser, default is disabled'),
    browser_kernel_config: browserKernelConfigSchema,
    random_ua: randomUaConfigSchema,
    tls_switch: z.enum(['0', '1']).optional().describe('The tls switch of the browser, default is 0'),
    tls: z.string().optional().describe('The tls of the browser, if tls_switch is 1, you can set the tls of the browser, eg: "0xC02C,0xC030"')
}).optional().describe('The fingerprint config of the browser, default is automatic_timezone: 0, timezone: "", language: [], flash: "", fonts: [], webrtc: disabled, browser_kernel_config: ua_auto, random_ua: ua_version: [], ua_system_version: [], tls_switch: 0, tls: ""');

export const schemas = {
    // Browser Related Schema
    createBrowserSchema: z.object({
        domainName: z.string().optional().describe('The domain name of the browser, eg: facebook.com'),
        openUrls: z.array(z.string()).optional().describe('The open urls of the browser, eg: ["https://www.google.com"]'),
        cookie: z.string().optional().describe('The cookie of the browser, eg: "[{\"domain\":\".baidu.com\",\"expirationDate\":\"\",\"name\":\"\",\"path\":\"/\",\"sameSite\":\"unspecified\",\"secure\":true,\"value\":\"\",\"id\":1}]"'),
        username: z.string().optional().describe('The username of the browser, eg: "user"'),
        password: z.string().optional().describe('The password of the browser, eg: "password"'),
        groupId: z.string()
            .regex(/^\d+$/, "Group ID must be a numeric string")
            .describe('The group id of the browser, must be a numeric string (e.g., "123"). You can use the get-group-list tool to get the group list or create a new group, or default is 0'),
        name: z.string().optional().describe('The name of the browser, eg: "My Browser"'),
        country: z.string().optional().describe('The country of the browser, eg: "CN"'),
        sysAppCateId: z.string().optional().describe('The sys app cate id of the browser, you can use the get-application-list tool to get the application list'),
        userProxyConfig: userProxyConfigSchema,
        fingerprintConfig: fingerprintConfigSchema,
        storageStrategy: z.number().optional().describe('The storage strategy of the browser, default is 0')
    }),

    updateBrowserSchema: z.object({
        domainName: z.string().optional().describe('The domain name of the browser, eg: facebook.com'),
        openUrls: z.array(z.string()).optional().describe('The open urls of the browser, eg: ["https://www.google.com"]'),
        cookie: z.string().optional().describe('The cookie of the browser, eg: "[{\"domain\":\".baidu.com\",\"expirationDate\":\"\",\"name\":\"\",\"path\":\"/\",\"sameSite\":\"unspecified\",\"secure\":true,\"value\":\"\",\"id\":1}]"'),
        username: z.string().optional().describe('The username of the browser, eg: "user"'),
        password: z.string().optional().describe('The password of the browser, eg: "password"'),
        groupId: z.string().optional().describe('The group id of the browser, must be a numeric string (e.g., "123"). You can use the get-group-list tool to get the group list or create a new group'),
        name: z.string().optional().describe('The name of the browser, eg: "My Browser"'),
        country: z.string().optional().describe('The country of the browser, eg: "CN"'),
        sysAppCateId: z.string().optional().describe('The sys app cate id of the browser, you can use the get-application-list tool to get the application list'),
        userProxyConfig: userProxyConfigSchema.optional(),
        fingerprintConfig: fingerprintConfigSchema.optional(),
        storageStrategy: z.number().optional().describe('The storage strategy of the browser, default is 0'),
        userId: z.string().describe('The user id of the browser to update, it is required when you want to update the browser')
    }),

    openBrowserSchema: z.object({
        serialNumber: z.string().optional().describe('The serial number of the browser to open'),
        userId: z.string().optional().describe('The browser id of the browser to open'),
        ipTab: z.enum(['0', '1']).optional().describe('The ip tab of the browser, 0 is not use ip tab, 1 is use ip tab, default is 0'),
        launchArgs: z.string().optional().describe(`The launch args of the browser, use chrome launch args, eg: ${JSON.stringify(["--blink-settings=imagesEnabled=false", "--disable-notifications"])}`),
        clearCacheAfterClosing: z.enum(['0', '1']).optional().describe('The clear cache after closing of the browser, 0 is not clear cache after closing, 1 is clear cache after closing, default is 0'),
        cdpMask: z.enum(['0', '1']).optional().describe('The cdp mask of the browser, 0 is not use cdp mask, 1 is use cdp mask, default is 0'),
    }).strict(),

    closeBrowserSchema: z.object({
        userId: z.string().describe('The browser id of the browser to stop, it is required when you want to stop the browser')
    }).strict(),

    deleteBrowserSchema: z.object({
        userIds: z.array(z.string()).describe('The user ids of the browsers to delete, it is required when you want to delete the browser')
    }).strict(),

    getBrowserListSchema: z.object({
        groupId: z.string()
            .regex(/^\d+$/, "Group ID must be a numeric string")
            .optional()
            .describe('The group id of the browser, must be a numeric string (e.g., "123"). You can use the get-group-list tool to get the group list'),
        size: z.number().optional().describe('The size of the page, max is 100, if get more than 100, you need to use the page to get the next page, default is 10'),
        page: z.number().optional().describe('The page of the browser, default is 1'),
        id: z.string().optional().describe('The id of the browser'),
        serialNumber: z.string().optional().describe('The serial number of the browser'),
        sort: z.enum(['serial_number', 'last_open_time', 'created_time']).optional()
            .describe('The sort of the browser'),
        order: z.enum(['asc', 'desc']).optional()
            .describe('The order of the browser')
    }).strict(),

    moveBrowserSchema: z.object({
        groupId: z.string()
            .regex(/^\d+$/, "Group ID must be a numeric string")
            .describe('The target group id, must be a numeric string (e.g., "123"). You can use the get-group-list tool to get the group list'),
        userIds: z.array(z.string()).describe('The browser ids to move')
    }).strict(),

    // Group Related Schema
    createGroupSchema: z.object({
        groupName: z.string().describe('The name of the group to create'),
        remark: z.string().optional().describe('The remark of the group')
    }).strict(),

    updateGroupSchema: z.object({
        groupId: z.string()
            .regex(/^\d+$/, "Group ID must be a numeric string")
            .describe('The id of the group to update, must be a numeric string (e.g., "123"). You can use the get-group-list tool to get the group list'),
        groupName: z.string().describe('The new name of the group'),
        remark: z.string().nullable().optional().describe('The new remark of the group')
    }).strict(),

    getGroupListSchema: z.object({
        groupName: z.string().optional().describe('The name of the group to search, use like to search, often used group name to find the group id, so eg: "test" will search "test" and "test1"'),
        size: z.number().optional().describe('The size of the page, max is 100, if get more than 100, you need to use the page to get the next page, default is 10'),
        page: z.number().optional().describe('The page of the group, default is 1')
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