import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';
import { AppOutput } from './../../interfaces/AppOutput';
import { convertDate } from './../../utils/convertDate';

const AppInventoryList = () => {

  const [appList, setAppList] = useState<AppOutput[]>([]);

  useEffect(() => {
    fetchAppList();
  }, []);

  const fetchAppList = async () => {
    const data = await fetchAdmixPlayInventory();
    setAppList(data);
  }

    const columns = [
        {
          title: 'APP TITLE & PUBLISHER',
          dataIndex: 'title',
          key: 'title',
          render: (title: string, appData: AppOutput) => <AppTitlePublisher {...appData} />,
        },
        {
          title: 'DAILY AVAILS',
          dataIndex: 'avails',
          key: 'avails',
        },
        {
          title: 'DATE ADDED',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (createdAt: string) => <span> {convertDate(createdAt)} </span>,
        },
        {
          title: 'UPDATED ON',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          render: (updatedAt: string) => <span> {convertDate(updatedAt)} </span>
        },
        {
          title: 'AGE',
          dataIndex: ['googlePlayStoreInfo' ,'contentRating'],
          key: 'contentRating',
        },
        {
          title: 'CATEGORY',
          key: 'storeCategories',
          dataIndex: ['googlePlayStoreInfo' ,'genre'],
        },
      ];

    return (
        <Card>
          <Table 
            columns={columns} 
            dataSource={appList}
            rowKey={'_id'}
        />
        </Card>
    )
}
export default AppInventoryList;