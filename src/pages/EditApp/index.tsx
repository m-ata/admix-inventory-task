import * as React from 'react';
import { PageHeader, Button, Divider, Form, Input, Row, Col, Select, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './index.scss';

const EditApp = () => {
    return (
        <div>
            <PageHeader
                title="Inventory / Edit"
                extra={[
                    <Button key="1" type='text' className='cancel'>Cancel</Button>,
                    <Button key="2" className='save'> Save </Button>
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
                                <Switch size='small' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Published"
                                name="isDeleted"
                                className='inline-items'
                            >
                                <InfoCircleOutlined />
                                <Switch size='small' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                label="App Title"
                                name="title"
                            >
                                <Input />
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
                                <Input />
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
                                <Input.TextArea autoSize={{minRows: 8, maxRows: 12}} placeholder="Please write app descriptio here" minLength={8} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>

    )
}
export default EditApp;