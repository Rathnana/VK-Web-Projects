import React, { useEffect, useState } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { Modal, Button, Select, Input, Form, Row, Col, Drawer } from 'antd';
import { Update_User } from '../../getDatabase';

const { Option } = Select;

export default function EditUser({ setSuccess, users, userId }) {
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



    useEffect(() => {
        if (users) {
            form.setFieldsValue(users)
        }
    }, [])


    const onFinish = async (values) => {
        setLoading(true)
        if(await Update_User(values, userId)){
            setVisible(false);
            setSuccess(true)
            setLoading(false)
        }
        else{
            setLoading(false)
        }

    };


    return (
        <div>

            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />
            <Drawer
                width={isMobile ? '100%' : 736}
                title="ធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់"
                placement="right"
                onClose={onClose}
                visible={visible}
            >

                <Form
                    form={form}
                    id='edit-User-form' layout="vertical" onFinish={onFinish}
                >

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
                                    កែប្រែ
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}
