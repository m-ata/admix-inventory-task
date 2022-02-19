import axios, { AxiosResponse } from 'axios';
import { AppFetchResponse } from './../interfaces/AppFetchResponse';

export const fetchAdmixPlayInventory = async () => {
    try {
        const response: AxiosResponse<AppFetchResponse> = await axios.post('/challenge-v1/fetch', {
            pageIndex: 0,
            pageSize: 5,
            filters:[{"name":"updatedAt", "value":"2020-07-25T22:01:57.366Z" , "operator": "gt"}],
            sorts:[{"field" : "updatedAt" , "desc" : true}]
        }, {
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