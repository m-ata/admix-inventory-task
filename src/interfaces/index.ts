export interface IFetchppRequestBody {
    pageIndex: number,
    pageSize: number,
    operator?: string,
    filters?: Filter[],
    sorts?: Sort[]
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
interface Filter {
    name: string,
    value: String[] | string,
    operator: string
}

interface Sort {
    field: string,
    desc: boolean
}

interface StoreInfo {
    contentRating: string,
    genre: string,
    icon: string,
    score: number,
    screenshots: string[],
    studio: string,
    title: string,
    url: string
}

interface AppMetrics {
    dau: number,
    mau: number,
    avgTimePerSession: number,
    sessions: number
}