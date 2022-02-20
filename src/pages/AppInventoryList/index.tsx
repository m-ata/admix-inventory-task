import React, { useEffect, useState } from 'react';
import { Table, Card, Input } from 'antd';
import { EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';
import { IAppOutput } from './../../interfaces';
import { convertDate } from './../../utils/convertDate';
import { IFetchppRequestBody, IFetchResponseData } from './../../interfaces';
import { defaultRequest } from './../../constant';
import './index.scss';

const AppInventoryList = () => {

  const [appsData, setAppsData] = useState<IFetchResponseData>(null);
  const [requestBody, setRequestBody] = useState<IFetchppRequestBody>(defaultRequest);
  const [isLoading, setIsLoading] = useState(false);

  const { sorts, pageIndex } = requestBody;

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

  const handleEdit = (id: string) => {
    navigate(`/edit-app/${id}`)
  }

  const handleTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    switch (extra['action']) {
      case 'sort':
        if (sorter?.field && sorter?.order) {
          const updatedSorts = [...sorts];
          const sortWithExistedField = updatedSorts.find(s => s.field === sorter.field);
          if (sortWithExistedField) {
            const index = updatedSorts?.indexOf(sortWithExistedField);
            updatedSorts[index] = { field: sorter.field, desc: sorter?.order === 'descend' ? true : false }
          } else {
            updatedSorts.push({ field: sorter.field, desc: sorter?.order === 'descend' ? true : false })
          }
          setRequestBody({ ...requestBody, sorts: updatedSorts });
        }
        break;
      case 'paginate':
        setRequestBody({ ...requestBody, pageIndex: pagination.current - 1, pageSize: pagination.pageSize });
        break;
    }
  }

  const columns: any = [
    {
      title: 'APP TITLE & PUBLISHER',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (title: string, appData: IAppOutput) => <AppTitlePublisher {...appData} />,
    },
    {
      title: '',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => <span className='featured-cell'> 
                {featured && <>
                <span className='circle'></span>
                <span> Featured </span>
                </>} 
                </span>,
    },
    {
      title: 'DAILY AVAILS',
      dataIndex: 'avails',
      key: 'avails',
      sorter: true,
      render: (avails: string) => <span className='avail-cell'> {avails} </span>
    },
    {
      title: 'DATE ADDED',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt: string) => <span className='date-cell'> {convertDate(createdAt)} </span>,
    },
    {
      title: 'UPDATED ON',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (updatedAt: string) => <span className='date-cell'> {convertDate(updatedAt)} </span>
    },
    {
      title: 'AGE',
      dataIndex: ['appStoreInfo', 'contentRating'],
      key: 'contentRating',
      render: (title: string, appData: IAppOutput) => <span className='age-cell'> {appData?.appStoreInfo ? title : appData?.googlePlayStoreInfo?.contentRating} </span>
    },
    {
      title: 'CATEGORY',
      key: 'genre',
      dataIndex: ['appStoreInfo', 'genre'],
      render: (title: string, appData: IAppOutput) => <span className='category-cell'> {appData?.appStoreInfo ? title : appData?.googlePlayStoreInfo?.genre} </span>
    },
    {
      title: '',
      key: 'edit',
      dataIndex: '_id',
      render: (_id: string) => <EditOutlined className='edit-icon' onClick={() => handleEdit(_id)} />
    },
  ];

  const itemRender = (current: any, type: string, originalElement: any) => {

    if (type === 'prev') {
      return (
        <div className={`${pageIndex === 0 ? 'disable-element' : ''}`} >
          <LeftOutlined />
          <a>prev</a>
        </div>);
    }
    if (type === 'next') {
      return <><a>next</a> <RightOutlined /> </>;
    }
    return originalElement;
  }

  return (
    <div className='layout-color'>
      <div className='layout'>
        <Input className='search-input' placeholder="Search app name" />
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={appsData?.items}
          rowKey={'_id'}
          onChange={handleTableChange}
          pagination={{
            pageSizeOptions: ['5', '10', '20', '50'],
            defaultPageSize: 5,
            current: pageIndex + 1,
            total: appsData?.totalCount,
            itemRender: itemRender
          }}
        />
      </div>
    </div>
  )
}
export default AppInventoryList;