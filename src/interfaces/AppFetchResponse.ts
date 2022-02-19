import { AppOutput } from './AppOutput';

export interface AppFetchResponse {
    data: Data,
    message: string,
    status: boolean
}

type Data = {
    dau: string,
    items: AppOutput[],
    totalCount: number
}