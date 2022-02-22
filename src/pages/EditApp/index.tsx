import React, { useState } from 'react';
import { PageHeader, Button, Divider, Form, Input, Row, Col, Select, Switch, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';
import notification from 'antd/lib/notification';
//css import
import './index.scss';
//custom imports
import { IAppOutput } from './../../interfaces';
import { updateEnrichedApp } from './../../api/admixplay.enriched.update';

const EditApp = () => {

    const appInfo = useSelector((state: any) => state.appInfo.appInfo);

    const [formData, setFormData] = useState<IAppOutput>(appInfo);
    const [tmpTagValue, setTmpTagValue] = useState<string>('');

    const navigate = useNavigate();

    const { _id, title, description, googlePlayStoreInfo, appStoreInfo, featured, isDeleted, tags } = formData;

    const handleSetFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSave = async () => {
        const response = await updateEnrichedApp(_id, formData);
        if (response?.status === 200) {
            notification.success({
                message: 'Success',
                description: response.data.message
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Something went wrong'
            });
        }
        navigate('/');
    }

    const handleCancel = () => {
        navigate('/');
    }

    const handleRemoveTag = (index: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setFormData({ ...formData, tags: updatedTags });
    }

    const handleAddTag = (tag: string) => {
        const updatedTags = [...tags];
        updatedTags.push(tag);
        setFormData({ ...formData, tags: updatedTags });
        setTmpTagValue('');
    }

    return (
        <div>
            <PageHeader
                title="Inventory / Edit"
                extra={[
                    <Button key="1" type='text' className='cancel' onClick={handleCancel}>Cancel</Button>,
                    <Button key="2" className='save' onClick={handleSave}> Save </Button>
                ]}
            />
            <div className={'form-layout'}>
                <Divider />
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout={'vertical'}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="App Details" className='app-details-label' />
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Featured" className='inline-items'>
                                <InfoCircleOutlined />
                                <Switch size='small' defaultChecked={featured} checked={featured} onChange={(value: boolean) => handleSetFormData('featured', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Published" className='inline-items'>
                                <InfoCircleOutlined />
                                <Switch size='small' defaultChecked={isDeleted} checked={isDeleted} onChange={(value: boolean) => handleSetFormData('isDeleted', value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="App Title">
                                <Input defaultValue={title} value={title} onChange={(e: any) => handleSetFormData('title', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Publisher Name">
                                <Input 
                                    defaultValue={appStoreInfo ? appStoreInfo.studio : googlePlayStoreInfo?.studio} 
                                    value={appStoreInfo ? appStoreInfo.studio : googlePlayStoreInfo?.studio}
                                    onChange={(e: any) => {
                                        if (appStoreInfo?.studio) {
                                            const updatedAppStoreInfo = {...formData.appStoreInfo};
                                            updatedAppStoreInfo.studio = e.target.value;
                                            setFormData({...formData, appStoreInfo: updatedAppStoreInfo});
                                        }
                                        if (googlePlayStoreInfo?.studio) {
                                            const updatedGooglePlayStoreInfo = {...formData.googlePlayStoreInfo};
                                            updatedGooglePlayStoreInfo.studio = e.target.value;
                                            setFormData({...formData, googlePlayStoreInfo: updatedGooglePlayStoreInfo});
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                label="App ID"
                                name="_id"
                            >
                                <Input disabled defaultValue={_id} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tags">
                                <Input 
                                    value={tmpTagValue}
                                    onChange={(e) => setTmpTagValue(e.target.value)}
                                    onBlur={(e: any) => handleAddTag(e.target.value)} 
                                    onKeyPress={(e: any) => e?.charCode === 13 && handleAddTag(e.target.value)} 
                                />
                                {
                                    tags?.map((tag: string, index: number) => {
                                        return (
                                            <Tag className='tag' key={`tag-${index}`}>
                                                <span> {tag} </span>
                                                <CloseOutlined className='close' onClick={() => handleRemoveTag(index)} />
                                            </Tag>
                                        )
                                    })
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="Categories">
                                <Select
                                    placeholder="Choose Category"
                                    allowClear
                                >
                                    <Select.Option value="Action">Action</Select.Option>
                                    <Select.Option value="Adventure">Adventure</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Description">
                                <Input.TextArea
                                    defaultValue={description}
                                    value={description}
                                    autoSize={{ minRows: 8, maxRows: 12 }}
                                    placeholder="Please write app descriptio here"
                                    minLength={8}
                                    onChange={(e: any) => handleSetFormData('description', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>

    )
}
export default EditApp;