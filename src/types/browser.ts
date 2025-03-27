import { z } from 'zod';
import { schemas } from './schemas.js';

// 代理配置的 Schema
export const userProxyConfigSchema = z.object({
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

// 浏览器内核配置的 Schema
export const browserKernelConfigSchema = z.object({
    version: z.union([
        z.literal("92"), z.literal("99"), z.literal("102"),
        z.literal("105"), z.literal("108"), z.literal("110"),
        z.literal("113"), z.literal("116"), z.literal("120"),
        z.literal("126"), z.literal("130"), z.literal("134"),
        z.literal("ua_auto")
    ]).optional(),
    type: z.enum(['chrome', 'firefox']).optional()
}).optional();

// 随机 UA 配置的 Schema
export const randomUaConfigSchema = z.object({
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

// 指纹配置的 Schema
export const fingerprintConfigSchema = z.object({
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

// 创建浏览器的参数 Schema
export const createBrowserParamsSchema = z.object({
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
});

// 更新浏览器的参数 Schema
export const updateBrowserParamsSchema = createBrowserParamsSchema.extend({
    userId: z.string().describe('The user id of the browser to update'),
});

// 从已有的 schema 中导出类型
export type CreateBrowserParams = z.infer<typeof schemas.createBrowserSchema>;
export type UpdateBrowserParams = z.infer<typeof schemas.updateBrowserSchema>;
export type OpenBrowserParams = z.infer<typeof schemas.openBrowserSchema>;
export type CloseBrowserParams = z.infer<typeof schemas.closeBrowserSchema>;
export type DeleteBrowserParams = z.infer<typeof schemas.deleteBrowserSchema>;
export type GetBrowserListParams = z.infer<typeof schemas.getBrowserListSchema>;
export type MoveBrowserParams = z.infer<typeof schemas.moveBrowserSchema>;