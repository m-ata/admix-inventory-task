import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Divider, Form, Input, Row, Col, Select, Switch, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';
import notification from 'antd/lib/notification';
import clsx from 'clsx';
//css import
import './index.scss';
//custom imports
import { IAppOutput } from './../../interfaces';
import { updateEnrichedApp } from './../../api/admixplay.enriched.update';
import { CATEGORIES } from '../../constant';

const EditApp = () => {

    const appInfo = useSelector((state: any) => state.appInfo.appInfo);

    const [formData, setFormData] = useState<IAppOutput>(appInfo);
    const [categories, setCategories] = useState<string[]>([]);
    const [tmpTagValue, setTmpTagValue] = useState<string>('');
    const [isRequestSend, setRequestSend] = useState<boolean>(false);

    const navigate = useNavigate();

    const { _id, title, description, googlePlayStoreInfo, appStoreInfo, featured, isDeleted, tags } = formData;

    useEffect(() => {
        if (appStoreInfo?.genre) {
            setCategories(appStoreInfo.genre.split(','));
        }
        if (googlePlayStoreInfo?.genre) {
            setCategories(googlePlayStoreInfo.genre.split(','));
        }
    }, [googlePlayStoreInfo, appInfo]);

    const handleSetFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSave = async () => {
        setRequestSend(true);
        const response = await updateEnrichedApp(_id, formData);
        setRequestSend(false);
        if (response?.status === 200) {
            notification.success({
                message: 'Success',
                description: response.data.message
            });
            navigate('/');
        } else {
            notification.error({
                message: 'Error',
                description: 'Something went wrong'
            });
        }
    }

    const handleCancel = () => {
        navigate('/');
    }

    // remove item from tags or categories based on type
    const handleRemoveItem= (type: string, index: number) => {
        if (type === 'tags') {
            const updatedTags = [...tags];
            updatedTags.splice(index, 1);
            setFormData({ ...formData, tags: updatedTags });
        }

        if (type === 'categories') {
            const updatedCategories = [...categories];
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories);
            handleSetAppGenre(updatedCategories);
        }
    }

    // handle categories change and set genre accordingly
    const handleCategoriesChanged = (categories: string[]) => {
        setCategories(categories);
        handleSetAppGenre(categories);
    }

    // set app genre with comma separated string based on categories
    const handleSetAppGenre = (categories: string[]) => {
        if (appStoreInfo) {
            const updatedAppStoreInfo = {...formData.appStoreInfo};
            updatedAppStoreInfo.genre = categories.join(', ');
            setFormData({...formData, appStoreInfo: updatedAppStoreInfo});
        }
        if (googlePlayStoreInfo) {
            const updatedGooglePlayStoreInfo = {...formData.googlePlayStoreInfo};
            updatedGooglePlayStoreInfo.genre = categories.join(', ');
            setFormData({...formData, googlePlayStoreInfo: updatedGooglePlayStoreInfo});
        }
    }

    // push tmpTag into tags array
    const handleAddTag = (tag: string) => {
        const updatedTags = [...tags];
        updatedTags.push(tag);
        setFormData({ ...formData, tags: updatedTags });
        setTmpTagValue('');
    }

    return (
        <div className={clsx({'disable': isRequestSend})}>
            <PageHeader
                title="Inventory / Edit"
                extra={[
                    <Button key="1" type='text' className='cancel' onClick={handleCancel}>Cancel</Button>,
                    <Button key="2" type='primary' className='save' onClick={handleSave}> Save </Button>
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
                                    onBlur={(e: any) => setTmpTagValue('')} 
                                    onKeyPress={(e: any) => e?.charCode === 13 && handleAddTag(e.target.value)} // add tags on Enter key 
                                />
                                {
                                    tags?.map((tag: string, index: number) => {
                                        return (
                                            <Tag className='tag' key={`tag-${index}`}>
                                                <span> {tag} </span>
                                                <CloseOutlined className='close' onClick={() => handleRemoveItem('tags', index)} />
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
                                    mode='multiple'
                                    value={categories}
                                    onChange={handleCategoriesChanged}
                                    disabled={!googlePlayStoreInfo && !appStoreInfo}
                                >
                                    {
                                        CATEGORIES.map((cat, index) => <Select.Option  key={index} value={cat.name}> {cat.name} </Select.Option>)
                                    }
                                </Select>
                                {
                                    categories?.map((cat: string, index: number) => {
                                        return (
                                            <Tag className='tag' key={`cat-${index}`}>
                                                <span> {cat} </span>
                                                <CloseOutlined className='close' onClick={() => handleRemoveItem('categories', index)}  />
                                            </Tag>
                                        )
                                    })
                                }
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