export interface IFetchppRequestBody {
    pageIndex: number,
    pageSize: number,
    operator?: string,
    filters?: IFilter[],
    sorts?: ISort[]
}

export interface IAppFetchResponse {
    data: IFetchResponseData,
    message: string,
    status: boolean
}

export interface IFetchResponseData {
    dau: string;
    items: IAppOutput[],
    totalCount: number
}
export interface IAppOutput {
    title: string,
    tags: string[],
    platform: "mobile" | "vr" | "ar",
    score: number,
    _id: string,
    updatedAt: string,
    createdAt: string,
    googlePlayStoreInfo: StoreInfo,
    appStoreInfo: StoreInfo,
    avails: number,
    metrics: AppMetrics
    storeCategories: string,
}
export interface IAppInfo {
    appInfo: IAppOutput;
}
export interface IFilter {
    name: string,
    value: String[] | string,
    operator: string
}

export interface ISort {
    field: string,
    desc: boolean
}

export interface StoreInfo {
    contentRating: string,
    genre: string,
    icon: string,
    score: number,
    screenshots: string[],
    studio: string,
    title: string,
    url: string
}

export interface AppMetrics {
    dau: number,
    mau: number,
    avgTimePerSession: number,
    sessions: number
}