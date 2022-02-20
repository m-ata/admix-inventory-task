import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import { IAppOutput }  from './../../interfaces';
import { EMPTY_IMAGE } from '../../constant';
import './index.css';

const { Text } = Typography;


const AppTitlePublisher = (props: IAppOutput) => {

  const { title, googlePlayStoreInfo, appStoreInfo } = props;

  const iconLink = appStoreInfo ? appStoreInfo?.icon : (googlePlayStoreInfo ? googlePlayStoreInfo?.icon : EMPTY_IMAGE)

  return (
    <Space>
      <Avatar className='app-icon' shape={'square'} icon={<img src={iconLink} />} />
      <Text className='app-text-layout'>
        <Text className={'app-title'}> {title} </Text>
        <Text className={'app-publisher'} > {appStoreInfo ? appStoreInfo?.studio : googlePlayStoreInfo?.studio} </Text>
      </Text>
    </Space>
  )
}
export default AppTitlePublisher;