
export interface AppInfo {
    id: string;
    title: string;
    dev: string;
    poster: string;
    url: string;
    desc?: string;
}

export interface RowData {
    title: string;
    apps: AppInfo[];
}
