import { requestHeader } from '../constant/index';
import axios, { AxiosResponse } from 'axios';
import { IAppOutput } from '../interfaces';

export const updateEnrichedApp = async (id: string, body: IAppOutput) => {
	try {
		const response: AxiosResponse<any> = await axios.put(`challenge-v1/enrich/update/${id}`, body, {
				headers: requestHeader
		});
		return response;
	} catch (err) {
		throw err;
	}
}