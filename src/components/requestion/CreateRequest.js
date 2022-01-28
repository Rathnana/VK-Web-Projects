import React, { useState, useEffect } from 'react'
import { Select, Input, DatePicker, Row, Col, Space, Drawer } from 'antd';
import axios from 'axios'
import { Create_Request } from '../../getDatabase'
import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
export default function CreateRequest({ setSuccess }) {
    const [form] = Form.useForm();
    const [construction, setConstruction] = useState()
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const onFinish = values => {
        setVisible(false);
        Create_Request(values, sessionStorage.getItem("u_id"));
        form.resetFields();
        setSuccess(true)

    };

    useEffect(() => {
        getConstruction();
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
                    console.log(response?.data.data);
                    return response?.data;
                } else {
                    return [];
                }
            });
    }


    return (
        <>
            <Button onClick={showDrawer} type="primary" size='large' style={{ width: '100%' }}>+ បន្ថែមថ្មី</Button>
            <Drawer width={500} title="ការស្នើរសុំសម្ភារៈ" placement="right" onClose={onClose} visible={visible}>
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
                                                    <Input style={{ width: 100 }} type="number" placeholder="បរិមាណ" size='large' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="ឯកតា"
                                                    {...restField}
                                                    name={[name, 'unit']}
                                                    rules={[{ required: true, message: 'សូមបញ្ជូលឯកតា' }]}
                                                >
                                                    <Input style={{ width: 100 }} type="number" placeholder="ឯកតា" size='large' />
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
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" size='large'>
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
