import { IFilter, ISort } from './../interfaces';
export const defaultRequest = {
	pageIndex: 0,
	pageSize: 5,
	operator: '',
	filters: [] as IFilter[],
	sorts: [] as ISort[]
}