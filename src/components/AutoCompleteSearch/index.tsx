import React, { useState, useEffect } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';

const AutoCompleteSearch = (props: any) => {

    const { optionList, handleSearchSelect } = props;

    const [userInput, setUserInput] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);


    const onSelect = (data: string) => {
        handleSearchSelect(data);
    };

    const onSearch = (searchText: string) => {
        setSuggestions(
            optionList?.filter(
                (suggestion: any) =>
                    (suggestion?.value?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1)

            )
        );
    };

    const onChange = (data: string) => {
        console.log(data)
        setUserInput(data);
    };

    return (
        <AutoComplete
            value={userInput}
            options={suggestions}
            className='auto-complete-search'
            onChange={onChange}
            onSearch={onSearch}
            onSelect={onSelect}
            onKeyDown={(e: any) => e?.keyCode === 13 && handleSearchSelect(e?.target?.value)}
        >
            <Input allowClear placeholder="Search app name" prefix={<SearchOutlined />} />
        </AutoComplete>
    )
}
export default AutoCompleteSearch;