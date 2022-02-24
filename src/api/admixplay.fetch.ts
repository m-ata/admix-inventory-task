import axios, { AxiosResponse } from 'axios';
import { REQUEST_HEADER } from '../constant';
import { IFetchppRequestBody, IAppFetchResponse } from './../interfaces';

export const fetchAdmixPlayInventory = async (body: IFetchppRequestBody) => {
    try {
        const response: AxiosResponse<IAppFetchResponse> = await axios.post('/challenge-v1/fetch', body, {
            headers: REQUEST_HEADER
        });
        return response?.data?.data;
      } catch (err) {
        throw err;
      }
}