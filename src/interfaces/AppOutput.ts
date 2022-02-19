import { StoreInfo } from './StoreInfo';
import { AppMetrics } from './AppMetrics';

export interface AppOutput {
    title: string,
    tags: string[],
    platform: "mobile" | "vr" | "ar",
    googlePlayStoreInfo: StoreInfo,
    appStoreInfo: StoreInfo,
    avails: number,
    metrics: AppMetrics
    storeCategories: string,
}