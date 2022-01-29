
import React, { useEffect } from 'react'
import { Col, Row, DatePicker, Select, Form } from 'antd';
import { Typography, Button } from 'antd';
import RequestionTable from './RequestionTable';
import CreateRequest from './CreateRequest';
import axios from 'axios'

const { Title } = Typography;
const { Option } = Select;
export default function Requestion() {
    const [form] = Form.useForm();
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [constructionId, setConstructionId] = React.useState();
    const [date, setDate] = React.useState();
    const [construction, setConstruction] = React.useState();

    useEffect(() => {
        getConstruction()
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
                    return response?.data;
                } else {
                    return [];
                }
            });
    }
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
                        {`តារាងស្នើរសុំសម្ភារៈ`}
                    </Title>
                    <Form
                        form={form}
                        id='request-cash-filter-form'
                    >
                        <Row>
                            <Col xs={24} sm={24} md={6} lg={5} xl={4} style={{ padding: 5 }}>
                                <Form.Item
                                    name="constructionName"
                                // label="ឈ្មោះការដ្ឋាន"
                                >
                                    <Select onChange={e => setConstructionId(e)} placeholder="ឈ្មោះការដ្ឋាន" size='large' style={{ width: '100%' }} >
                                        <Option value={''} key='all'>--ទាំងអស់--</Option>
                                        {
                                            construction?.map(con => <Option value={con.c_id}>{con.constructionName}</Option>)
                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={5} xl={4} style={{ padding: 5 }}>
                                <Form.Item
                                    name="date"
                                // label="កាលបរិច្ឆេទ"
                                >
                                    <DatePicker
                                        placeholder="កាលបរិច្ឆេទ"
                                        size='large'
                                        style={{ width: '100%' }}
                                        onChange={e => setDate(e)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={3} xl={3} style={{ padding: 5 }}>

                                <Button
                                    onClick={() => {
                                        form.resetFields();
                                        setConstructionId(null);
                                        setDate(null)
                                    }}
                                    type="primary"
                                    size='large'
                                    style={{ width: '100%' }}
                                >
                                    Reset
                                </Button>

                            </Col>
                            <Col xs={24} sm={24} md={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 7 }} xl={{ span: 3, offset: 10 }} style={{ padding: 5 }}>
                                <CreateRequest
                                    setSuccess={setSuccess}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >

                    <RequestionTable
                        setLoading={setLoading}
                        loading={loading}
                        setSuccess={setSuccess}
                        success={success}
                        constructionId={constructionId}
                        date={date}
                    />
                </Col>
            </Row>
        </div>
    )
}
