import React from 'react';
import { Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

const AppTitlePublisher = (props: any) => {

    const { icon, title, studio } = props;

    return (
      <div>
        <Avatar size={64} shape={'square'} icon={<img src={icon} />} />
        <Title level={5} > {title} </Title>
        <Text> {studio} </Text>
      </div>
    )
}
export default AppTitlePublisher;