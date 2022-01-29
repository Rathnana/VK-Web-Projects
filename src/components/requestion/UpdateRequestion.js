

import React, { useState, useEffect } from 'react'
import { Select, Modal, Input, DatePicker, Row, Col, Space, Drawer, InputNumber } from 'antd';
import axios from 'axios'
import { update_Request } from '../../getDatabase';
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';


const { Option } = Select;

export default function UpdateRequestion({
    setSuccess,
    r_id,
    requests
}) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading,setLoading] = useState(false)

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 960) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const [construction, setConstruction] = useState()
    const [data, setData] = useState()

    const onFinish = async (values) => {

        setLoading(true)
        let updateState = await update_Request(values, r_id);
        if(updateState===true){
            setVisible(false);
            setSuccess(true)
            setLoading(false)
        }else{
            setLoading(false)
        }

    };

    useEffect(() => {
        getConstruction()
        getRequestDescription(r_id)

    }, [])
    const getConstruction = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getConstruction.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setConstruction(response?.data.data)
                    return response?.data;
                } else {
                    return [];
                }
            });
    }
    const getRequestDescription = async (r_id) => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({ requestId: r_id }));

        return await axios.post(
            `${process.env.React_App_URL}/get/getRequestDescription.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    if (response?.data.data) {
                        form.setFieldsValue({
                            constructionId: requests?.constructionId,
                            date: moment(requests?.date),
                            needDate: moment(requests?.needDate),
                            requestTo: requests?.requestTo,
                            purpose: requests?.purpose,
                            requests: response?.data.data
                        })
                    }

                    return response?.data;
                } else {
                    return [];
                }
            });
    }
    return (
        <div>
            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit />} size='middle' />
            <Drawer
                width={isMobile ? '100%' : 736}
                title="ការស្នើរសុំសម្ភារៈ"
                placement="right"
                onClose={onClose}
                visible={visible}
            >

                <Form
                    form={form}
                    id='create-requestion-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="date"
                                label="ថ្ងៃស្នើរសុំ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃស្នើរសុំ!!" }]}
                            >

                                <DatePicker
                                    placeholder='ថ្ងៃស្នើរសុំ'
                                    size='large'
                                    style={{ width: "100%" }}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="needDate"
                                label="ថ្ងៃត្រូវការ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃត្រូវការ!!" }]}
                            >
                                <DatePicker
                                    placeholder='ថ្ងៃត្រូវការ'
                                    size='large'
                                    style={{ width: "100%" }}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="requestTo"
                                label="ស្នើរទៅកាន់"
                                rules={[{ required: true, message: "សូមជ្រើសរើសសំណើរទៅកាន់!!" }]}
                            >
                                <Select
                                    placeholder="ស្នើរទៅកាន់"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="វីខេ អង្គរ">វីខេ អង្គរ</Option>
                                    <Option value="ម្ចាស់គម្រោង">ម្ចាស់គម្រោង</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="constructionId"
                                label="សម្រាប់ការដ្ឋាន"
                                rules={[{ required: true, message: "សូមជ្រើសរើសការដ្ឋាន!!" }]}
                            >
                                <Select
                                    placeholder="ជ្រើសរើសការដ្ឋាន"
                                    size="large"
                                    allowClear
                                >
                                    {
                                        construction?.map(con => <Option value={con.c_id}>{con.constructionName}</Option>)
                                    }


                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="purpose"
                                label="គោលបំណង"
                                rules={[
                                    {
                                        required: true,
                                        message: "សូមបញ្ជូលគោលបំណងក្នុងការស្នើរសុំ!!"
                                    },
                                ]}
                            >
                                <Input
                                    placeholder='គោលបំណងក្នុងការស្នើរសុំ'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.List name="requests">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, value, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex' }} align="baseline">
                                                <Form.Item
                                                    label="ការបរិយាយ"
                                                    {...restField}
                                                    name={[name, 'requestFor']}
                                                    rules={[{ required: true, message: 'សូមបញ្ជូលការបរិយាយ' }]}
                                                >
                                                    <Input style={{ width: 235 }} placeholder="ការបរិយាយ" size='large' />
                                                </Form.Item>

                                                <Form.Item
                                                    label="បរិមាណ"
                                                    {...restField}
                                                    name={[name, 'qty']}
                                                    rules={[{ required: true, message: 'សូមបញ្ជូលបរិមាណ' }]}
                                                >
                                                    <InputNumber style={{ width: 100 }} placeholder="បរិមាណ" size='large' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="ឯកតា"
                                                    {...restField}
                                                    name={[name, 'unit']}
                                                    rules={[{ required: true, message: 'សូមបញ្ជូលឯកតា' }]}
                                                >
                                                    <Input style={{ width: 100 }} placeholder="ឯកតា" size='large' />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                បន្ថែម
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loading} size='large'>
                                    កែប្រែ
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

        </div >
    )
}
