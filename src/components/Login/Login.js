import React, { useState } from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios'
const { Footer } = Layout;

export default function Login({ setAuth }) {
    const [loading, setLoading] = useState(false)
    const onFinish = async (values) => {

        setLoading(true)
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({ username: values.username, password: values.password }));

        return await axios.post(
            `${process.env.React_App_URL}/login/loginProcessAdmin.php`, params
        )
            .then(async function (response) {

                if (response?.data === "incorrect") {
                    message.error("Username & Password មានបញ្ហា!!")
                    setLoading(false)
                } else {
                    message.success('Login ជោគជ័យ!!');
                    sessionStorage.setItem("u_id", response?.data?.u_id);
                    sessionStorage.setItem("username", response?.data?.firstName);
                    // window.location.reload();
                    setAuth(true)
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row
            className='login-form'
        >
            <Col xs={24} 
                style={{ padding: '20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}
            >
                <div style={{width:'400px'}}>
                    <FaUserCircle className="Login-user-icon" />
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "15pt",
                            fontFamily: "Bayon",
                            marginTop: "20px",
                            color: '#1890ff'
                        }}
                    >
                        ចូលទៅកាន់ប្រព័ន្ធគ្រប់គ្រង
                    </p>

                    <Form
                        name="basic"

                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        style={{
                            marginTop: "50px"
                        }}
                    >
                        <Row>
                            <Col xs={24}>
                                <Form.Item
                                    label="ឈ្មោះអ្នកប្រើប្រាស់"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input size='large' style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    label="លេខសម្ងាត់"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password size='large' style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>


                            <Col xs={24}>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" size='large' style={{width:'100%'}} loading={loading} >
                                        ចូលប្រព័ន្ធ
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
            <Footer
                style={{
                    textAlign: 'center',
                    // position: "absolute",
                    // bottom: 0,
                    width: "100%",
                }}
            >
                &#169; គ្រប់រូបភាព និងអត្ថបទត្រូវបានរក្សាសិទ្ធដោយ វីខេ អង្គរ
            </Footer>
        </Row>
    )
}
