import React, { useEffect, useState } from 'react';
import { Table, Switch } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { fetchAdmixPlayInventory } from './../../api/admixplay.fetch';
import AppTitlePublisher from './../../components/AppTitlePublisher';
import { IAppOutput } from './../../interfaces';
import { convertDate } from './../../utils/convertDate';
import { IFetchppRequestBody, IFetchResponseData, IFilter, ITableFilters, ITableFileDS } from './../../interfaces';
import { DEFAULT_REQUEST, CATEGORIES, TOTAL_COUNT } from './../../constant';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAppInfo, setFilters } from './../../redux/slices/appInfo.slice';
import AutoCompleteSearch from './../../components/AutoCompleteSearch';
import { convertAvails } from './../../utils/convertAvails';

const AppInventoryList = () => {

  const [appsData, setAppsData] = useState<IFetchResponseData>(null);
  const [requestBody, setRequestBody] = useState<IFetchppRequestBody>(DEFAULT_REQUEST);
  const [isLoading, setIsLoading] = useState(false);

  const appFilters: ITableFilters = useSelector((state: any) => state.appInfo.filters);

  const { sorts, pageIndex, filters } = requestBody;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => { // fetch data in componentDidMount for filters
    fetchFullAppList({
      pageIndex: 0,
      pageSize: TOTAL_COUNT,
      filters: [],
      sorts: []
    });
  }, []);

  useEffect(() => {
    fetchAppList();
  }, [requestBody]);

  const fetchFullAppList = async (request: IFetchppRequestBody) => {
    const data = await fetchAdmixPlayInventory(request);
    setUniqueContentRating(data.items);
  }

  const setUniqueContentRating = (apps: IAppOutput[]) => { // set unique values to store for filters
    const uniqueGooglePlayStoreRating = apps.map(item => item?.googlePlayStoreInfo?.contentRating)?.filter((value, index, self) => value && self.indexOf(value) === index).map(val => {
      return {
        type: 'googlePlayStoreInfo.contentRating',
        value: val
      }
    });
    const uniqueAppStoreInfoRatings = apps.map(item => item?.appStoreInfo?.contentRating)?.filter((value, index, self) => value && self.indexOf(value) === index).map(val => {
      return {
        type: 'appStoreInfo.contentRating',
        value: val
      }
    });
    const uniqueAvails = apps.map(item => item?.avails)?.filter((value, index, self) => value && self.indexOf(value) === index).map(val => {
      return {
        field: 'avails',
        title: convertAvails(val),
        value: val,
        operator: 'in'
      }
    })
    const allUniqueAvails: ITableFileDS[] = [];
    uniqueAvails.forEach((avail: any) => {
      allUniqueAvails.push(avail);
      allUniqueAvails.push({
        field: 'avails',
        title: `> ${convertAvails(avail.value)}`,
        value: avail.value,
        operator: 'gt'
      });
      allUniqueAvails.push({
        field: 'avails',
        title: `< ${convertAvails(avail.value)}`,
        value: avail.value,
        operator: 'lt'
      });
    })
    const uniqueContentRatings = [...uniqueGooglePlayStoreRating, ...uniqueAppStoreInfoRatings];
    dispatch(setFilters({...appFilters, contentRatings: uniqueContentRatings, avails: allUniqueAvails}));
  }

  const fetchAppList = async () => {
    setIsLoading(true);
    const data = await fetchAdmixPlayInventory(requestBody);
    setAppsData(data);
    setIsLoading(false);
  }

  const handleEdit = (appData: IAppOutput) => {
    dispatch(setAppInfo({ ...appData }));
    navigate(`/edit-app`)
  }

  const handleTableChange = (pagination: any, tableFilters: any, sorter: any, extra: any) => {
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
      case 'filter':
        const allFilters: any = Object.keys(tableFilters);
        const updatedFilters: IFilter[] = [];
        if (allFilters.length > 0) {
          allFilters?.forEach((filter: string) => {
            if(tableFilters[filter]) {
              let singleFilter = {
                name: '',
                value: '' as string [] | string,
                operator: ''
              }
              if (filter === 'genre' || filter === 'contentRating') {
                const googlePlayStorValues: string[] = [];
                const appStorValues: string[] = [];
                let appStorInfo: any = {
                  name: '',
                  value: '' as String[] | string,
                  operator: ''
                };
                let googlePlayStorInfo: any = {
                  name: '',
                  value: '' as String[] | string,
                  operator: ''
                };
                tableFilters[filter]?.forEach((key: string, index: number, data: string[]) => {
                  const filterValues = key.split('-');
                  if (data?.length === 1) {
                    singleFilter = {
                      name:  filterValues[0],
                      value: filterValues[1],
                      operator: filterValues[2]
                    }
                  } else {
                    if(filterValues[0].split('.')[0] === 'googlePlayStoreInfo') {
                      googlePlayStorValues.push(filterValues[1]);
                      googlePlayStorInfo = {
                        name: filterValues[0],
                        value: googlePlayStorValues,
                        operator: filterValues[2]
                      }
                    }
                    if(filterValues[0].split('.')[0] === 'appStoreInfo') {
                      appStorValues.push(filterValues[1]);
                      appStorInfo = {
                        name: filterValues[0],
                        value: appStorValues,
                        operator: filterValues[2]
                      }
                    }
                  }
                })
                if (appStorInfo.value) {
                  updatedFilters.push(appStorInfo);
                }
                if (googlePlayStorInfo.value) {
                  updatedFilters.push(googlePlayStorInfo);
                }
              } else {
                tableFilters[filter]?.forEach((key: string, index: number, data: string[]) => {
                  const filterValues = key.split('-');
                  updatedFilters.push({
                    name:  filterValues[0],
                    value: filterValues[1],
                    operator: filterValues[2]
                  });
                })
              }
            }
          });
        }
        setRequestBody({...requestBody, filters: updatedFilters});
    }
  }

  const columns: any = [
    {
      title: 'STATUS',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted: boolean) => <Switch checked={isDeleted} />
    },
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
      filters: appFilters.avails.map((avail: ITableFileDS) => {
        return {
          text: avail.title,
          value: `${avail.field}-${avail.value}-${avail.operator}`
        }
      }),
      render: (avails: number) => <span className='avail-cell'> {avails} </span>
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
      filters: appFilters.contentRatings.map(contentRating => {
        return {
          text: contentRating.value,
          value: `${contentRating.type}-${contentRating.value}-in`
        }
      }),
      render: (title: string, appData: IAppOutput) => <span className='age-cell'> {appData?.appStoreInfo ? title : appData?.googlePlayStoreInfo?.contentRating} </span>
    },
    {
      title: 'CATEGORY',
      key: 'genre',
      dataIndex: ['appStoreInfo', 'genre'],
      filters: CATEGORIES.map(cat => {
        return {
          text: cat.name,
          value: `["googlePlayStoreInfo.genre", "appStoreInfo.genre"]-${cat.name}-in`
        }
      }),
      render: (title: string, appData: IAppOutput) => <span className='category-cell'> {appData?.appStoreInfo ? title : appData?.googlePlayStoreInfo?.genre} </span>
    },
    {
      title: '',
      key: 'edit',
      dataIndex: '_id',
      render: (_id: string, appData: IAppOutput) => <EditOutlined className='edit-icon' onClick={() => handleEdit(appData)} />
    },
  ];

  const handleSearchSelect = (input: string) => {
    const updatedFilters = [...filters];
    const filtersWithTitle = updatedFilters.find(f => f.name === 'title');
    if (filtersWithTitle) {
      const index = updatedFilters?.indexOf(filtersWithTitle);
      updatedFilters[index].value = input
    } else {
      updatedFilters.push({
        name: 'title',
        value: input,
        operator: 'like'
      })
    }
    setRequestBody({ ...requestBody, filters: updatedFilters });
  }

  return (
    <div className='layout-color'>
      <div className='layout'>
        <AutoCompleteSearch isDisable={isLoading} handleSearchSelect={handleSearchSelect} />
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={appsData?.items}
          rowKey={'_id'}
          onChange={handleTableChange}
          pagination={{
            pageSizeOptions: ['5', '10', '20', '50'],
            current: pageIndex + 1,
            total: appsData?.totalCount,
          }}
        />
      </div>
    </div>
  )
}
export default AppInventoryList;