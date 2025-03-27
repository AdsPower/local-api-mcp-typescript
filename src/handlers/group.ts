import axios from 'axios';
import { LOCAL_API_BASE, API_ENDPOINTS } from '../constants/api.js';
import type {
    CreateGroupParams,
    UpdateGroupParams,
    GetGroupListParams
} from '../types/group.js';

export const groupHandlers = {
    async createGroup({ groupName, remark }: CreateGroupParams) {
        const requestBody: Record<string, string> = {
            group_name: groupName
        };
        
        if (remark !== undefined) {
            requestBody.remark = remark;
        }

        const response = await axios.post(`${LOCAL_API_BASE}${API_ENDPOINTS.CREATE_GROUP}`, requestBody);
        
        if (response.data.code === 0) {
            return `Group created successfully with name: ${groupName}${remark ? `, remark: ${remark}` : ''}`;
        }
        throw new Error(`Failed to create group: ${response.data.message}`);
    },

    async updateGroup({ groupId, groupName, remark }: UpdateGroupParams) {
        const requestBody: Record<string, any> = {
            group_id: groupId,
            group_name: groupName
        };
        
        if (remark !== undefined) {
            requestBody.remark = remark;
        }

        const response = await axios.post(`${LOCAL_API_BASE}${API_ENDPOINTS.UPDATE_GROUP}`, requestBody);
        
        if (response.data.code === 0) {
            return `Group updated successfully with id: ${groupId}, name: ${groupName}${remark !== undefined ? `, remark: ${remark === null ? '(cleared)' : remark}` : ''}`;
        }
        throw new Error(`Failed to update group: ${response.data.message}`);
    },

    async getGroupList({ name, size }: GetGroupListParams) {
        const params = new URLSearchParams();
        if (name) {
            params.set('group_name', name);
        }
        if (size) {
            params.set('page_size', size.toString());
        }

        const response = await axios.get(`${LOCAL_API_BASE}${API_ENDPOINTS.GET_GROUP_LIST}`, { params });
        return `Group list: ${JSON.stringify(response.data.data.list, null, 2)}`;
    }
}; 