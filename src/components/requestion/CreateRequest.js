import React, { useState, useEffect } from 'react'
import { Select, Input, DatePicker, Row, Col, Space, Drawer, InputNumber } from 'antd';
import axios from 'axios'
import { Create_Request, getCookie } from '../../getDatabase'
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import PrintContent from './PrintContent';
import { SelectCustomer } from '../report/SelectCustomer';
import moment from 'moment'

const { Option } = Select;
export default function CreateRequest({ setSuccess }) {
    const [form] = Form.useForm();
    const [construction, setConstruction] = useState()
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data,setData] = useState(null)
    const [openPrint,setOpenPrint] = useState(false)
    const [requestId,setRequestId] = useState(null)

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
        form.setFieldsValue({
            date:moment()
        })
    }, [])

    window.addEventListener('resize', handleResize)

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const onFinish = async (values) => {
        setLoading(true)
        setData(values)
        let insertedId = await Create_Request(values, getCookie("u_id"))
        if (insertedId>0) {
            setRequestId(insertedId)
            setVisible(false);
            form.resetFields();
            setSuccess(true)
            setOpenPrint(true)
        } else {
            setLoading(false)
        }


    };

    const setConstructionCustomer = e => {
        form.setFieldsValue({
            constructionId: e
        })
    }

    return (
        <>
            <Button onClick={showDrawer} type="primary" size='large' style={{ width: '100%' }}>+ បន្ថែមថ្មី</Button>
            <PrintContent r_id={requestId} open={openPrint} setOpen={setOpenPrint} />
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
                                <SelectCustomer title={"ជ្រើសរើសការដ្ឋាន"} setValue={setConstructionCustomer} />

                                {/* <Select
                                    placeholder="ជ្រើសរើសការដ្ឋាន"
                                    size="large"
                                    allowClear
                                >
                                    {
                                        construction?.map(con => <Option key={con.c_id} value={con.c_id}>{con.constructionName}</Option>)
                                    }


                                </Select> */}
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
                                            <Row key={key} gutter={10}>
                                                <Col xs={11} md={8}>
                                                    <Form.Item
                                                        label="ការបរិយាយ"
                                                        {...restField}
                                                        name={[name, 'requestFor']}
                                                        rules={[{ required: true, message: 'សូមបញ្ជូលការបរិយាយ' }]}
                                                    >
                                                        <Input style={{ width: '100%' }} placeholder="ការបរិយាយ" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={5} md={4}>
                                                    <Form.Item
                                                        label="qty"
                                                        {...restField}
                                                        name={[name, 'qty']}
                                                        rules={[{ required: true, message: 'សូមបញ្ជូលបរិមាណ' }]}
                                                    >
                                                        <InputNumber style={{ width: '100%' }} min={0} prefix={0.1} placeholder="qty" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={6} md={6}>
                                                    <Form.Item
                                                        label="ឯកតា"
                                                        {...restField}
                                                        name={[name, 'unit']}
                                                        rules={[{ required: true, message: 'សូមបញ្ជូលឯកតា' }]}
                                                    >
                                                        <Input style={{ width: '100%' }} placeholder="ឯកតា" size='large' />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={2} md={2}>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
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
                                <Button style={{ width: "100%" }} type="primary" loading={loading} htmlType="submit" size='large'>
                                    បង្កើត
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

        </ >
    )
}
