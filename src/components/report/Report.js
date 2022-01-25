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
                    <Row style={{marginBottom:10}}>
                        <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{padding:5}}>
                            <Input placeholder="ឈ្មោះការដ្ឋាន" size='large' style={{ width: '100%' }} />
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{padding:5}}>
                            <DatePicker size='large' style={{ width: '100%' }} placeholder="កាលបរិច្ឆេទ" defaultValue={moment()} format={dateFormatList} />
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={2} style={{padding:5}}>
                            <Button type="primary" style={{ width: '100%' }} size='large'>OK</Button>
                        </Col>
                        <Col xs={24} sm={24} md={{span:5,offset:6}} lg={{span:4,offset:7}} xl={{span:3,offset:11}} style={{padding:5}}>
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
