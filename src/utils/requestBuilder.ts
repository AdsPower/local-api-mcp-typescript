import { CreateBrowserParams, UpdateBrowserParams } from '../types/browser.js';

export function buildRequestBody(params: CreateBrowserParams | UpdateBrowserParams): Record<string, any> {
    const requestBody: Record<string, any> = {};

    const basicFields: Record<string, string> = {
        domainName: 'domain_name',
        openUrls: 'open_urls',
        cookie: 'cookie',
        username: 'username',
        password: 'password',
        groupId: 'group_id',
        name: 'name',
        country: 'country',
        sysAppCateId: 'sys_app_cate_id',
        userId: 'user_id'
    };
    Object.entries(basicFields).forEach(([paramKey, key]) => {
        const value = params[paramKey as keyof typeof params];
        if (value !== undefined) {
            requestBody[key] = value;
        }
    });

    if (params.userProxyConfig) {
        const proxyConfig = buildNestedConfig(params.userProxyConfig);
        if (Object.keys(proxyConfig).length > 0) {
            requestBody.user_proxy_config = proxyConfig;
        }
    }

    if (params.fingerprintConfig) {
        const fpConfig = buildNestedConfig(params.fingerprintConfig);
        if (Object.keys(fpConfig).length > 0) {
            requestBody.fingerprint_config = fpConfig;
        }
    }

    if (params.storageStrategy !== undefined) {
        requestBody.storage_strategy = params.storageStrategy;
    }

    return requestBody;
}

function buildNestedConfig(config: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined) {
            if (typeof value === 'object' && value !== null) {
                const nestedConfig = buildNestedConfig(value);
                if (Object.keys(nestedConfig).length > 0) {
                    result[key] = nestedConfig;
                }
            } else {
                result[key] = value;
            }
        }
    });

    return result;
} 