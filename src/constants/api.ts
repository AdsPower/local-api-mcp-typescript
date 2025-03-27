export const LOCAL_API_BASE = 'http://127.0.0.1:50325';

export const API_ENDPOINTS = {
    START_BROWSER: '/api/v1/browser/start',
    CLOSE_BROWSER: '/api/v1/browser/stop',
    CREATE_BROWSER: '/api/v1/user/create',
    GET_BROWSER_LIST: '/api/v1/user/list',
    GET_GROUP_LIST: '/api/v1/group/list',
    GET_APPLICATION_LIST: '/api/v1/application/list',
    UPDATE_BROWSER: '/api/v1/user/update',
    DELETE_BROWSER: '/api/v1/user/delete',
    GET_OPENED_BROWSER: '/api/v1/browser/local-active',
    CREATE_GROUP: '/api/v1/group/create',
    UPDATE_GROUP: '/api/v1/group/update',
    MOVE_BROWSER: '/api/v1/user/regroup'
} as const; 