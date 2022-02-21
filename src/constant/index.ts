import { IFilter, ISort, StoreInfo, AppMetrics, IAppInfo } from './../interfaces';
export const defaultRequest = {
	pageIndex: 0,
	pageSize: 5,
	operator: '',
	filters: [] as IFilter[],
	sorts: [] as ISort[]
}
export const EMPTY_IMAGE = 'https://ecdn.teacherspayteachers.com/thumbitem/Blank-Game-Board-3-4468982-1553533522/original-4468982-1.jpg';

export const initialState: IAppInfo = {
	appInfo : {
		title: '',
    	tags: [''],
    	platform: 'mobile',
    	score: 0,
    	_id: '',
    	updatedAt: '',
    	createdAt: '',
    	googlePlayStoreInfo: null as StoreInfo,
    	appStoreInfo: null as StoreInfo,
    	avails: 0,
		metrics: null as AppMetrics,
		description: '',
		featured: false,
		isDeleted: false
	}
}