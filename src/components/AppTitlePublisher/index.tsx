import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import { AppOutput }  from './../../interfaces/AppOutput';

const { Title, Text } = Typography;

import './index.css';

const AppTitlePublisher = (props: AppOutput) => {

  const { title, googlePlayStoreInfo } = props;

  return (
    <Space>
      <Avatar size={64} shape={'square'} icon={<img src={googlePlayStoreInfo?.icon} />} />
      <Text>
        <Title level={5} className={'app-title'}> {title} </Title>
        <Text className={'app-publisher'} > {googlePlayStoreInfo?.studio} </Text>
      </Text>
    </Space>
  )
}
export default AppTitlePublisher;