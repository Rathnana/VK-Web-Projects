import React, { useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col } from 'antd';
import { Button } from 'antd';
import { Creat_PettyCash } from '../../getDatabase'



export default function CreatePettyCash({ setSuccess }) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = values => {
        // console.log(values);
        setIsModalVisible(false);
        Creat_PettyCash(values, sessionStorage.getItem("u_id"));
        form.resetFields();
        setSuccess(true)

    };


    return (
        <div

        >
            <Button style={{
                position: "absolute",
                right: 0,
            }} onClick={showModal} type="primary">+ បន្ថែមថ្មី</Button>

            <Modal
                title="បង្កើត Petty Cash"
                okText="បង្កើត"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                cancelText="បោះបង់"
                okButtonProps={{ form: 'create-petty-cash-form', key: 'submit', htmlType: 'submit' }}
            >
                <Form
                    form={form}
                    id='create-petty-cash-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="date"
                                label="កាលបរិច្ឆេទ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសកាលបរិច្ឆេទ!!" }]}
                            >
                                <DatePicker
                                    placeholder="កាលបរិច្ឆេទ"
                                    size="large"
                                    style={{ width: '100%' }}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="borrowPerson"
                                label="ឈ្មោះអ្នកខ្ចី"
                                rules={[{ required: true, message: "សូមបំពេញឈ្មោះអ្នកខ្ចី!!" }]}
                            >
                                <Input
                                    placeholder="ឈ្មោះអ្នកខ្ចី"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="totalCash"
                                label="ចំនួនទឹកប្រាក់"
                                rules={[{ required: true, message: "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="ចំនួនទឹកប្រាក់"
                                    size="large"
                                />


                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="remark"
                                label="ផ្សេងៗ"

                            >
                                <Input
                                    placeholder='ផ្សេងៗ'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </div >
    )
}
