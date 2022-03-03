import { Alert, Button, Col, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { TiLockOpen } from 'react-icons/ti'
import { Reset_Password } from '../../getDatabase'

export default function ResetPassword({ setSuccess, userId }) {

    const [form] = useForm()

    const [isError, setIsError] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState(null)
    const [confirm, setConfirm] = useState(null)

    const onFinish =  async (e) => {
        setLoading(true)
        if(await Reset_Password({password:e?.password,u_id:userId})){
            setOpen(false);
            setSuccess(true)
            setLoading(false)
        }
        else{
            setLoading(false)
        }
    }

    const handleInputPassword = (e) => {
        setPassword(e)
        setConfirm(null)
        form.setFieldsValue({
            cfpassword: null
        })
    }

    const handleInputConfirm = (e) => {
        if (e?.length === password?.length) {
            if (e !== password) {
                setIsError(true)
            } else {
                setIsError(false)
            }
        }
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)} type="primary" shape="circle" icon={<TiLockOpen style={{ marginTop: '5px' }} />} size='middle' />
            <Modal
                // width={isMobile ? '100%' : 736}
                title="កំណត់លេខសម្ងាត់សារជាថ្មី"
                onClose={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                visible={open}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Row gutter={10}>
                        {
                            isError && <Col xs={24}>
                                <Form.Item>
                                    <Alert message="លេខសម្ងត់មិនដូចគ្នា" type="warning" showIcon />
                                </Form.Item>
                            </Col>

                        }
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="password"
                                label="លេខសម្គាល់ថ្មី"
                                rules={[{ required: true, message: "សូមបញ្ជូលសម្គាល់ថ្មី!!" }]}
                            >
                                <Input.Password
                                    placeholder='សម្គាល់ថ្មី'
                                    size='large'
                                    allowClear
                                    onKeyUp={(e) => handleInputPassword(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="cfpassword"
                                label="បញ្ជាក់លេខសម្គល់ថ្មី"
                                rules={[{ required: true, message: "សូមបញ្ជូលសម្គាល់ថ្មី!!" }]}
                            >
                                <Input.Password
                                    placeholder='បញ្ញាក់'
                                    size='large'
                                    allowClear
                                    onKeyUp={(e) => handleInputConfirm(e.target.value)}
                                />
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
            </Modal>
        </div>
    )
}
