import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import { IAppOutput }  from './../../interfaces';

const { Title, Text } = Typography;

import './index.css';

const AppTitlePublisher = (props: IAppOutput) => {

  const { title, googlePlayStoreInfo, appStoreInfo } = props;

  return (
    <Space>
      <Avatar size={64} shape={'square'} icon={<img src={appStoreInfo ? appStoreInfo?.icon : googlePlayStoreInfo?.icon} />} />
      <Text>
        <Title level={5} className={'app-title'}> {title} </Title>
        <Text className={'app-publisher'} > {appStoreInfo ? appStoreInfo?.studio : googlePlayStoreInfo?.studio} </Text>
      </Text>
    </Space>
  )
}
export default AppTitlePublisher;