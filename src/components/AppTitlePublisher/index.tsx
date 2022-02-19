import React from 'react';
import { Avatar, Typography } from 'antd';
import { AppOutput }  from './../../interfaces/AppOutput';

const { Title, Text } = Typography;

const AppTitlePublisher = (props: AppOutput) => {

  const { title, googlePlayStoreInfo } = props;

  return (
    <div>
      <Avatar size={64} shape={'square'} icon={<img src={googlePlayStoreInfo?.icon} />} />
      <Title level={5} > {title} </Title>
      <Text> {googlePlayStoreInfo?.studio} </Text>
    </div>
  )
}
export default AppTitlePublisher;