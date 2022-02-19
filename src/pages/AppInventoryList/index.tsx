import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Card } from 'antd';
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';

const AppInventoryList = () => {

  const [appList, setAppList] = useState([]);

  useEffect(() => {
    fetchAppList();
  }, []);

  const fetchAppList = async () => {
    const data = await fetchAdmixPlayInventory();
    setAppList(data.data.items);
  }

    const columns = [
        {
          title: 'APP TITLE & PUBLISHER',
          dataIndex: 'googlePlayStoreInfo',
          key: 'title',
          render: (googlePlayStoreInfo: any) => <AppTitlePublisher {...googlePlayStoreInfo} />,
        },
        {
          title: 'DAILY AVAILS',
          dataIndex: 'avails',
          key: 'avails',
        },
        {
          title: 'DATE ADDED',
          dataIndex: 'address',
          key: 'date',
        },
        {
          title: 'UPDATED ON',
          dataIndex: 'address',
          key: 'update',
        },
        {
          title: 'AGE',
          dataIndex: 'address',
          key: 'age',
        },
        {
          title: 'CATEGORY',
          key: 'tags',
          dataIndex: 'tags',
          render: (tags: any) => (
            <>
              {tags.map((tag: string, i: number) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <span color={color} key={tag}>
                    {tag}
                    { i !== tags?.length - 1 && <span>, </span> }
                  </span>
                );
              })}
            </>
          ),
        },
      ];

    return (
        <Card>
          <Table 
            columns={columns} 
            dataSource={appList} 
        />
        </Card>
    )
}
export default AppInventoryList;