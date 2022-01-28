import React, { useEffect } from 'react'
import { Col, Row, Form, DatePicker, Select } from 'antd';
import { Typography, Button } from 'antd';
import ReportTable from './ReportTable';
import AddReport from './AddReport';
import axios from 'axios';


const { Title } = Typography;
const { Option } = Select;
export default function Report() {
    const [form] = Form.useForm();
    const [customers, setCustomers] = React.useState(null);
    const [chiefs, setChiefs] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [customerId, setCustomerId] = React.useState(null);
    const [chiefId, setChiefId] = React.useState(null);

    useEffect(() => {
        getCustomers();
        getCheifs()
    }, [])
    const getCustomers = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getCustomerWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setCustomers(response?.data?.data);
                    // console.log(response?.data?.data);
                    return response?.data;
                } else {
                    return [];
                }
            });
    }

    const getCheifs = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getUser.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setChiefs(response?.data?.data);
                    console.log(response?.data?.data);
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
                        {`តារាងរបាយការណ៍`}
                    </Title>
                    <Form
                        form={form}
                        id='report-filter-form'
                    >
                        <Row style={{ marginBottom: 10 }}>

                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <Form.Item
                                    name="StartDate"
                                // label="ថ្ងៃចាប់ផ្ដើម"
                                >
                                    <DatePicker
                                        size='large'
                                        style={{ width: '100%' }}
                                        placeholder="ថ្ងៃចាប់ផ្ដើម"
                                        onChange={e => setStartDate(e)}
                                    />
                                </Form.Item>

                            </Col>
                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <Form.Item
                                    name="EndtDate"
                                // label="ថ្ងៃបញ្ចប់"
                                >
                                    <DatePicker
                                        size='large'
                                        style={{ width: '100%' }}
                                        placeholder="ថ្ងៃបញ្ចប់"
                                        onChange={e => setEndDate(e)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <Form.Item
                                    name="constructionName"
                                // label="ឈ្មោះការដ្ឋាន"
                                >
                                    <Select
                                        placeholder="ឈ្មោះការដ្ឋាន"
                                        size='large'
                                        style={{ width: '100%' }}
                                        showSearch
                                        onChange={e => setCustomerId(e)}
                                    >
                                        {
                                            customers?.map(customer =>
                                                <Option key={customer.c_id} value={customer.customerId}>{customer.constructionName}</Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <Form.Item
                                    name="chiefId"
                                >
                                    <Select
                                        placeholder="ឈ្មោះការដ្ឋាន"
                                        size='large'
                                        style={{ width: '100%' }}
                                        onChange={e => setChiefId(e)}
                                    >
                                        {
                                            chiefs?.map(chief =>
                                                <Option key={chief.u_id} value={chief.u_id}>{`${chief.lastName} ${chief.firstName}`}</Option>
                                            )
                                        }


                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <Button
                                    type="primary"
                                    style={{ width: '100%' }}
                                    size='large'
                                    onClick={() => {
                                        form.resetFields();
                                        setStartDate(null)
                                        setChiefId(null)
                                        setCustomerId(null)
                                        setEndDate(null)
                                    }}
                                >
                                    Reset
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={5} xl={3} style={{ padding: 5 }}>
                                <AddReport setSuccess={setSuccess} />
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <ReportTable
                        setLoading={setLoading}
                        loading={loading}
                        setSuccess={setSuccess}
                        success={success}
                        startDate={startDate}
                        endDate={endDate}
                        customerId={customerId}
                        chiefId={chiefId}
                    />
                </Col>
            </Row>
        </div >
    )



}
