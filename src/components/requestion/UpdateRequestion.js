

import React, { useState, useEffect } from 'react'
import { Select, Input, DatePicker, Row, Col, Space, Drawer, InputNumber } from 'antd';
import axios from 'axios'
import { update_Request } from '../../getDatabase';
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';
import { SelectCustomer } from '../report/SelectCustomer'

const { Option } = Select;

export default function UpdateRequestion({
    setSuccess,
    r_id,
    requests
}) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)

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
        if (updateState === true) {
            setVisible(false);
            setSuccess(true)
            setLoading(false)
        } else {
            setLoading(false)
        }

    };

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
                            // constructionId: requests?.constructionId,
                            // date: moment(requests?.date),
                            // needDate: moment(requests?.needDate),
                            // requestTo: requests?.requestTo,
                            // purpose: requests?.purpose,
                            requests: response?.data.data
                        })
                    }

                    return response?.data;
                } else {
                    return [];
                }
            });
    }

    useEffect(() => {

        if (visible) {
            form.setFieldsValue({
                constructionId: requests?.constructionId,
                date: moment(requests?.date),
                needDate: moment(requests?.needDate),
                requestTo: requests?.requestTo,
                purpose: requests?.purpose,
            })
            getRequestDescription(r_id)
        }

    }, [r_id, visible])

    const setConstructionCustomer = e => {
        form.setFieldsValue({
            constructionId: e
        })
    }


    return (
        <div>
            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit />} size='middle' />
            <Drawer
                width={isMobile ? '100%' : 736}
                title="??????????????????????????????????????????????????????"
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
                                label="????????????????????????????????????"
                                rules={[{ required: true, message: "?????????????????????????????????????????????????????????????????????!!" }]}
                            >

                                <DatePicker
                                    placeholder='????????????????????????????????????'
                                    size='large'
                                    style={{ width: "100%" }}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="needDate"
                                label="????????????????????????????????????"
                                rules={[{ required: true, message: "?????????????????????????????????????????????????????????????????????!!" }]}
                            >
                                <DatePicker
                                    placeholder='????????????????????????????????????'
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
                                label="?????????????????????????????????"
                                rules={[{ required: true, message: "??????????????????????????????????????????????????????????????????!!" }]}
                            >
                                <Select
                                    placeholder="?????????????????????????????????"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="???????????? ???????????????">???????????? ???????????????</Option>
                                    <Option value="????????????????????????????????????">????????????????????????????????????</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="constructionId"
                                label="?????????????????????????????????????????????"
                                rules={[{ required: true, message: "?????????????????????????????????????????????????????????!!" }]}
                            >


                                <SelectCustomer title={"????????????????????????????????????????????????"} setValue={setConstructionCustomer} />

                                {/* <Select
                                    placeholder="????????????????????????????????????????????????"
                                    size="large"
                                    allowClear
                                >
                                    {
                                        construction?.map(con => <Option value={con.c_id}>{con.constructionName}</Option>)
                                    }


                                </Select> */}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="purpose"
                                label="?????????????????????"
                                rules={[
                                    {
                                        required: true,
                                        message: "????????????????????????????????????????????????????????????????????????????????????????????????!!"
                                    },
                                ]}
                            >
                                <Input
                                    placeholder='?????????????????????????????????????????????????????????????????????'
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
                                            <Row key={key} gutter={10}>
                                                <Col xs={11} md={8}>
                                                    <Form.Item
                                                        label="???????????????????????????"
                                                        {...restField}
                                                        name={[name, 'requestFor']}
                                                        rules={[{ required: true, message: '??????????????????????????????????????????????????????' }]}
                                                    >
                                                        <Input style={{ width: '100%' }} placeholder="???????????????????????????" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={5} md={4}>
                                                    <Form.Item
                                                        label="qty"
                                                        {...restField}
                                                        name={[name, 'qty']}
                                                        rules={[{ required: true, message: '?????????????????????????????????????????????' }]}
                                                    >
                                                        <InputNumber style={{ width: '100%' }} min={0} prefix={0.1} placeholder="qty" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={6} md={6}>
                                                    <Form.Item
                                                        label="????????????"
                                                        {...restField}
                                                        name={[name, 'unit']}
                                                        rules={[{ required: true, message: '???????????????????????????????????????' }]}
                                                    >
                                                        <Input style={{ width: '100%' }} placeholder="????????????" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={2} md={2}>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                ??????????????????
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
                                    ??????????????????
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

        </div >
    )
}
