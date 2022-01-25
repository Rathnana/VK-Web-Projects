import React, { useEffect, useState } from 'react'
import { AiOutlineEdit } from "react-icons/ai";
import { Modal, Button, Select, Input, Form, Row, Col } from 'antd';
import { Update_User } from '../../getDatabase';

const { Option } = Select;

export default function EditUser({ setSuccess, users, userId }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        if (users) {
            form.setFieldsValue(users)
        }
    }, [])


    const onFinish = (values) => {
        setIsModalVisible(false)
        Update_User(values, userId)
        setSuccess(true)
       
    };


    return (
        <div>

            <Button onClick={showModal} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />

            <Modal
                title="ធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                okText="កែប្រែ"
                cancelText="បោះបង់"
                okButtonProps={{ form: 'edit-User-form', key: 'submit', htmlType: 'submit' }}
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
                                    <Option value="Manangement">Manangement</Option>
                                    <Option value="User">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
