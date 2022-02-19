import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import {
  MoreOutlined
} from '@ant-design/icons';
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';
import { IAppOutput } from './../../interfaces';
import { convertDate } from './../../utils/convertDate';
import { IFetchppRequestBody } from './../../interfaces';

const AppInventoryList = () => {

  const [appList, setAppList] = useState<IAppOutput[]>([]);
  const [requestBody, setRequestBody] = useState<IFetchppRequestBody>({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    fetchAppList();
  }, []);

  const fetchAppList = async () => {
    const data = await fetchAdmixPlayInventory(requestBody);
    setAppList(data);
  }

    const columns: any = [
        {
          title: 'APP TITLE & PUBLISHER',
          dataIndex: 'title',
          key: 'title',
          render: (title: string, appData: IAppOutput) => <AppTitlePublisher {...appData} />,
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
          dataIndex: ['appStoreInfo' ,'contentRating'],
          key: 'contentRating',
          render: (title: string, appData: IAppOutput) => <span> { appData?.appStoreInfo ? title : appData?.googlePlayStoreInfo?.contentRating } </span>
        },
        {
          title: 'CATEGORY',
          key: 'storeCategories',
          dataIndex: ['googlePlayStoreInfo' ,'genre'],
        },
        {
          title: '',
          key: 'more',
          render: () => <MoreOutlined />
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