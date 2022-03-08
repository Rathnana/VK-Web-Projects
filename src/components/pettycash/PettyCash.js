import React from 'react'
import { Col, Row } from 'antd';
import { Typography, Button, Form } from 'antd';
import { Select } from 'antd';
import CreatePettyCash from './CreatePettyCash'
import PettyCashTable from './PettyCashTable';


const { Option } = Select;
const { Title } = Typography;

export default function PettyCash({ search }) {
    const [form] = Form.useForm();
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [status, setStatus] = React.useState('')
    return (
        <div
            style={{
                paddingLeft: "20px",
                paddingRight: "20px"
            }}
        >

            <Row>
                {/* Header ---------------------------------------------------- */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Title
                        style={{
                            fontFamily: 'Moul',
                            color: '#1983e6',
                            fontWeight: 'normal',
                        }}
                        level={4}
                    >
                        {`តារាង Pretty Cash`}
                    </Title>
                    <Form
                        form={form}
                        id='petty-cash-filter-form'
                    >
                        <Row>
                            <Col xs={24} sm={24} md={8} lg={6} xl={4} style={{ padding: 5 }}>

                                <Form.Item
                                    name="status"
                                    // label="ស្ថានភាព"
                                    // rules={[{ required: true, message: "សូមជ្រើសរើសស្ថានភាព!!" }]}
                                >
                                    <Select
                                        placeholder="ស្ថានភាព"
                                        size='large'
                                        onChange={(e) => setStatus(e)}
                                    >
                                        <Option value={''} key='all'>--ទាំងអស់--</Option>
                                        <Option value="បានទូរទាត់">បានទូរទាត់</Option>
                                        <Option value="មិនទាន់ទូរទាត់">មិនទាន់ទូរទាត់</Option>
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col xs={24} sm={24} md={4} lg={3} xl={3} style={{ padding: 5 }}>
                                <Button onClick={() => {
                                    form.resetFields();
                                    setStatus(null)
                                }} type="primary" size='large' style={{ width: '100%' }}>Reset</Button>

                            </Col>
                            <Col xs={24} sm={24} md={{ span: 4, offset: 8 }} lg={{ span: 4, offset: 11 }} xl={{ span: 3, offset: 14 }} style={{ padding: 5 }} >
                                <CreatePettyCash
                                    setSuccess={setSuccess}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <PettyCashTable
                        setLoading={setLoading}
                        loading={loading}
                        setSuccess={setSuccess}
                        success={success}
                        status={status}
                        search={search}
                    />
                </Col>
            </Row>
        </div>
    )
}
