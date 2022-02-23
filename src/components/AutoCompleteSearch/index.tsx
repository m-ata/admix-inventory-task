import React, { useState, useCallback } from 'react';
import { Input, AutoComplete, Spin } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
//custom imports
import { IFetchppRequestBody } from '../../interfaces';
import { TOTAL_COUNT } from '../../constant';
import { fetchAdmixPlayInventory } from '../../api/admixplay.fetch';
//scss import
import './index.scss';

const AutoCompleteSearch = (props: any) => {

    const { handleSearchSelect, isDisable } = props;

    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isRequestSend, setRequestSend] = useState<boolean>(false);

    // call when user type on search input and set req body with debounce
    const onSearch = useCallback(
        debounce((searchText: string) => handleSendRequest({
            pageIndex: 0,
            pageSize: searchText ? TOTAL_COUNT : 0,
            filters: [{
                name: 'title',
                value: searchText,
                operator: 'like'
            }]
        }, searchText), 1000),
        []
    );

    // method to send request according to the search request
    const handleSendRequest = async (request: IFetchppRequestBody, query: string) => {
        setRequestSend(true);
        const data = await fetchAdmixPlayInventory(request);
        const filteredTitles = data?.items?.map( x => { return {value: x.title}}); // filter as per antd structure
        if (query) {
            setSuggestions(
                filteredTitles?.filter(
                    (suggestion: any) =>
                        (suggestion?.value?.toLowerCase().indexOf(query?.toLowerCase()) > -1)
    
                )
            );
        } else { 
            setSuggestions([]); // manually setting suggestions empty since all the data is coming even passing pageSize: 0
        }
        
        setRequestSend(false);
    }


    const onSelect = (data: string) => {
        handleSearchSelect(data);
    };

    return (
        <AutoComplete
            options={suggestions}
            className='auto-complete-search'
            onSearch={onSearch}
            onSelect={onSelect}
            onKeyDown={(e: any) => e?.keyCode === 13 && handleSearchSelect(e?.target?.value)}
        >
            <Input 
                disabled={isDisable} 
                placeholder="Search app name" 
                prefix={isRequestSend ? <Spin indicator={<LoadingOutlined className='loader-icon' />} /> : <SearchOutlined />} 
            />
        </AutoComplete>
    )
}
export default AutoCompleteSearch;