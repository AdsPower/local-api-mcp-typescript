export interface CreateGroupParams {
    groupName: string;
    remark?: string;
}

export interface UpdateGroupParams {
    groupId: string;
    groupName: string;
    remark?: string | null;
}

export interface GetGroupListParams {
    name?: string;
    size?: number;
} 