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
		avails: []
	}
}
export const TOTAL_COUNT = 492; // fetch api total count

export const CATEGORIES = [{
	name: "Action",
	describe: "Teen",
}, {
	name: "Adventure",
	describe: "Everyone +10",
}, {
	name: "Racing",
	describe: "+4",
}, {
	name: "Simulation",
	describe: "Teen",
}, {
	name: "Biking",
	describe: "+4",
}, {
	name: "Animals",
	describe: "+4",
}, {
	name: "Food",
	describe: "+4",
}, {
	name: "Gambling",
	describe: "+18",
}, {
	name: "Super Heroes",
	describe: "Teen",
}, {
	name: "Battle Royale",
	describe: "Teen",
}, {
	name: "Entertainment",
	describe: "Teen",
}, {
	name: "Sports",
	describe: "+4",
}, {
	name: "Fishing",
	describe: "+4",
}, {
	name: "Driving",
	describe: "+4",
}, {
	name: "RPG",
	describe: "Everyone +10",
}, {
	name: "Puzzle",
	describe: "+4",
}]