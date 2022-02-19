import axios, { AxiosResponse } from 'axios';
import { AppFetchResponse } from './../interfaces/AppFetchResponse';
import { IFetchppRequestBody } from './../interfaces';

export const fetchAdmixPlayInventory = async (body: IFetchppRequestBody) => {
    try {
        const response: AxiosResponse<AppFetchResponse> = await axios.post('/challenge-v1/fetch', body, {
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              'admix-api-key': '63c412d9-11c2-4a7f-9d2b-8a6aafc9c596'
            }
        })
        return response?.data?.data?.items;
      } catch (err) {
        console.log('err ', err)
      }
}