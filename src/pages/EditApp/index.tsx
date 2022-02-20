import * as React from 'react';
import { PageHeader, Button, Divider, Form, Input, Row, Col, Select } from 'antd';
import './index.css';

const EditApp = () => {
    return (
        <div>
            <PageHeader
                title="Inventory / Edit"
                extra={[
                    <Button key="1">Cancel</Button>,
                    <Button key="2" type="primary"> Save </Button>
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
                </Form>
            </div>
        </div>

    )
}
export default EditApp;