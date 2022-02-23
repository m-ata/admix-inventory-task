import { IFilter, ISort, StoreInfo, AppMetrics, IAppInfo } from './../interfaces';
export const DEFAULT_REQUEST = {
	pageIndex: 0,
	pageSize: 10,
	operator: '',
	filters: [] as IFilter[],
	sorts: [] as ISort[]
}

export const requestHeader = {
	'Content-Type': 'application/json',
	'admix-api-key': '2b7123aa-1a2f-4230-9275-7131d0de3fca'
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
	},
	filters: {
		contentRatings: [],
		avails: [],
		updatedAt: [],
	}
}

export const TOTAL_COUNT = 492; // fetch api total count

// I added type field because I need to differiantiate 
//between googlePlayStoreInfo and appStoreInfo 
//since we need to send separately as name, 
//logically it should accept array 

export const CATEGORIES = [{
	name: "Action",
	describe: "Teen",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Adventure",
	describe: "Everyone +10",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Racing",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Simulation",
	describe: "Teen",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Biking",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Animals",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Food",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Gambling",
	describe: "+18",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Super Heroes",
	describe: "Teen",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Battle Royale",
	describe: "Teen",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Entertainment",
	describe: "Teen",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Sports",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Fishing",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "Driving",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}, {
	name: "RPG",
	describe: "Everyone +10",
	type: 'googlePlayStoreInfo',
	operator: 'in'
}, {
	name: "Puzzle",
	describe: "+4",
	type: 'appStoreInfo',
	operator: 'in'
}]