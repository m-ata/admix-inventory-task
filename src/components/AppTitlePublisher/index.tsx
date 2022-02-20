import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import { IAppOutput }  from './../../interfaces';
import { EMPTY_IMAGE } from '../../constant';
import './index.css';

const { Title, Text } = Typography;


const AppTitlePublisher = (props: IAppOutput) => {

  const { title, googlePlayStoreInfo, appStoreInfo } = props;

  const iconLink = appStoreInfo ? appStoreInfo?.icon : (googlePlayStoreInfo ? googlePlayStoreInfo?.icon : EMPTY_IMAGE)

  return (
    <Space>
      <Avatar size={64} shape={'square'} icon={<img src={iconLink} />} />
      <Text>
        <Title level={5} className={'app-title'}> {title} </Title>
        <Text className={'app-publisher'} > {appStoreInfo ? appStoreInfo?.studio : googlePlayStoreInfo?.studio} </Text>
      </Text>
    </Space>
  )
}
export default AppTitlePublisher;