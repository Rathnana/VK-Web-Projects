import React, { useEffect, useState } from 'react'
import { Modal, Button, Select, Input, Form, Row, Col, Drawer } from 'antd';
import { Add_New_User } from '../../getDatabase';
const { Option } = Select;

export default function AddUser({ setSuccess }) {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const [loading,setLoading] = useState(false)

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
    const [form] = Form.useForm();



    const onFinish = async (values) => {
        setLoading(true)
        if (await Add_New_User(values)) {
            setVisible(false);
            form.resetFields()
            setSuccess(true)
            setLoading(false)
        }else{
            setLoading(false)
        }

    };

    return (
        <>
            <Button onClick={showDrawer} type="primary" size='large' style={{ width: '100%' }}>+ បន្ថែមអ្នកប្រើប្រាស់</Button>
            <Drawer
                width={isMobile ? '100%' : 736}
                title="បន្ថែមអ្នកប្រើប្រាស់"
                placement="right"
                onClose={onClose}
                visible={visible}
            >

                <Form
                    form={form}
                    id='add-User-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="username"
                                label="ឈ្មោះអ្នកប្រើប្រាស់"
                                rules={[{ required: true, message: "សូមបញ្ជូលឈ្មោះអ្នកប្រើប្រាស់!!" }]}
                            >
                                <Input
                                    placeholder='ឈ្មោះអ្នកប្រើប្រាស់'
                                    size='large'
                                    allowClear

                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="password"
                                label="ពាក្យសម្ងាត់"
                                rules={[{ required: true, message: "សូមបញ្ជូលពាក្យសម្ងាត់ 8 ខ្ទង់ឡើង!!", min: 8 }]}
                            >
                                <Input.Password
                                    placeholder='លេខសម្ងាត់'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="lastName"
                                label="គោត្តនាម"
                                rules={[{ required: true, message: "សូមបញ្ជូលគោត្តនាម!!" }]}
                            >
                                <Input
                                    placeholder='គោត្តនាម'
                                    size='large'
                                    allowClear

                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="firstName"
                                label="នាម"
                                rules={[{ required: true, message: "សូមបញ្ជូលនាម!!" }]}
                            >
                                <Input
                                    placeholder='នាម'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="role"
                                label="ជ្រើសរើសប្រភេទអ្នកប្រើប្រាស់"
                                rules={[
                                    {
                                        required: true,
                                        message: "សូមជ្រើសរើសប្រភេទអ្នកប្រើប្រាស់!!"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="ប្រភេទអ្នកប្រើប្រាស់"
                                    size='large'
                                >
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Management">Management</Option>
                                    <Option value="User">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item

                            >
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
