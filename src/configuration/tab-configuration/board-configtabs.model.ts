// export interface Tabs
// {
//     Tab[];
// }

export interface Tab {
    groupId: string;
    displayName: string;
}

export const tabsModel: ({ groupId: string; displayName: string } | { groupId: string; displayName: string })[] = [
    {
        groupId: 'dashboard_config',
        displayName: 'Dashboard Config'
    },
    {
        groupId: 'apiendpoint_config',
        displayName: 'API Endpoint Registration'
    }
];
