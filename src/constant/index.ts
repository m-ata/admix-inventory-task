import { IFilter, ISort } from './../interfaces';
export const defaultRequest = {
	pageIndex: 0,
	pageSize: 5,
	operator: '',
	filters: [] as IFilter[],
	sorts: [] as ISort[]
}
export const EMPTY_IMAGE = 'https://ecdn.teacherspayteachers.com/thumbitem/Blank-Game-Board-3-4468982-1553533522/original-4468982-1.jpg'