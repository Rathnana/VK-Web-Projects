import React from 'react'
import { Col, Row, Space, DatePicker } from 'antd';
import moment from 'moment';
import { Typography, Input, Button } from 'antd';
import ReportTable from './ReportTable';
import AddReport from './AddReport';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Title } = Typography;
export default function Report() {
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
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
                    <Row>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Title level={5}>
                                <Space size='middle'>
                                    <Input placeholder="ឈ្មោះការដ្ឋាន" />
                                    <DatePicker placeholder="កាលបរិច្ឆេទ" defaultValue={moment()} format={dateFormatList} />
                                    <Button type="primary">OK</Button>
                                </Space>
                            </Title>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <AddReport setSuccess={setSuccess} />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <ReportTable
                        setLoading={setLoading}
                        loading={loading}
                        setSuccess={setSuccess}
                        success={success}
                    />
                </Col>
            </Row>
        </div>
    )
}
