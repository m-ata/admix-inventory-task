import React, { useState } from 'react';
import { PageHeader, Button, Divider, Form, Input, Row, Col, Select, Switch } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
//css import
import './index.scss';
//custom imports
import { IAppOutput } from './../../interfaces';
import { updateEnrichedApp } from './../../api/admixplay.enriched.update';

const EditApp = () => {

    const appInfo = useSelector((state: any) => state.appInfo.appInfo);

    const [formData, setFormData] = useState<IAppOutput>(appInfo);

    const navigate = useNavigate();

    const { _id, title, description, googlePlayStoreInfo, appStoreInfo, featured, isDeleted } = formData;

    const handleSetFormData = (field: string, value: any) => {
        setFormData({...formData, [field]: value});
    }

    const handleSave = async () => {
       const response = await updateEnrichedApp(_id, formData);
       navigate('/');
    }

    const handleCancel = () => {
        navigate('/');
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
                            <Form.Item
                                label="App Details"
                                name="details"
                                className='app-details-label'
                            >
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Featured"
                                name="featured"
                                className='inline-items'
                            >
                                <InfoCircleOutlined />
                                <Switch size='small' defaultChecked={featured} checked={featured} onChange={(value: boolean) => handleSetFormData('featured', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Published"
                                name="isDeleted"
                                className='inline-items'
                            >
                                <InfoCircleOutlined />
                                <Switch size='small' defaultChecked={isDeleted} checked={isDeleted} onChange={(value: boolean) => handleSetFormData('isDeleted', value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                label="App Title"
                                name="title"
                            >
                                <Input defaultValue={title} value={title} onChange={(e: any) => handleSetFormData('title', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Publisher Name"
                                name="studio"
                            >
                                <Input />
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
                            <Form.Item
                                label="Tags"
                                name="tags"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                label="Categories"
                                name="genre"
                            >
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
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <Input.TextArea 
                                    defaultValue={description} 
                                    value={description} 
                                    autoSize={{minRows: 8, maxRows: 12}} 
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