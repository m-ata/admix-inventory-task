import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import {
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';
import { IAppOutput } from './../../interfaces';
import { convertDate } from './../../utils/convertDate';
import { IFetchppRequestBody, IFetchResponseData } from './../../interfaces';
import { defaultRequest } from './../../constant';
import './index.css';

const AppInventoryList = () => {

  const [appsData, setAppsData] = useState<IFetchResponseData>(null);
  const [requestBody, setRequestBody] = useState<IFetchppRequestBody>(defaultRequest);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppList();
  }, [requestBody]);

  const fetchAppList = async () => {
    setIsLoading(true);
    const data = await fetchAdmixPlayInventory(requestBody);
    setAppsData(data);
    setIsLoading(false);
  }

  const handlePagination = (pageNumber: number) => {
    setRequestBody({ ...requestBody, pageIndex: pageNumber - 1 });
  }

  const handlePageSizeChange = (current: number, page: number) => {
    setRequestBody({ ...requestBody, pageIndex: current - 1, pageSize: page - 1 });
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-app/${id}`)
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
          key: 'edit',
          dataIndex: '_id',
          render: (_id: string) => <EditOutlined  className='edit-icon'  onClick={() => handleEdit(_id)} />
        },
      ];

    return (
        <Card>
          <Table 
            loading={isLoading}
            columns={columns} 
            dataSource={appsData?.items}
            rowKey={'_id'}
            pagination={{
              onChange: handlePagination,
              pageSize: requestBody?.pageSize,
              current: requestBody?.pageIndex + 1,
              total: appsData?.totalCount,
              onShowSizeChange: handlePageSizeChange,
              pageSizeOptions: ['5', '10', '20', '50'],
          }}
        />
        </Card>
    )
}
export default AppInventoryList;