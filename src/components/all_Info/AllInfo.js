import { Col, Row, Space, DatePicker, PageHeader, Button } from 'antd'
import React, { useState } from 'react'
import { Typography } from 'antd';
import moment from 'moment';
import SectionA from './SectionA';
import SectionB from './SectionB';
import UnLawWorkTabel from './UnLawWorkTabel'
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default function AllInfo() {
    let navigate = useNavigate();
    const [date, setDate] = useState()
    const [totalData,setTotalData] = useState({
        totalWorker:0,
        totalBuilder:0
    })

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
                        ព័ត៌មានសរុប <span style={{fontFamily:'KhmerOsSiemreap',color:'gray'}}>{`(ជាង:${totalData?.totalBuilder} | កម្មករ:${totalData?.totalWorker})`}</span>
                    </Title>
                    <Row>
                        <Col>
                            <Title level={5}>
                                <Space size='middle'>
                                    កាលបរិច្ឆេទ:
                                    <DatePicker
                                        defaultValue={moment()}
                                        placeholder="កាលបរិច្ឆេទ"
                                        size='large'
                                        allowClear={false}
                                        format={dateFormatList}
                                        onChange={(e) => setDate(e)}
                                    />
                                </Space>
                            </Title>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                    <Row>
                        <SectionA date={date} setTotalData={setTotalData} />
                        <SectionB />

                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <PageHeader
                                ghost={false}
                                title="ការដ្ឋានរត់ច្បាប់"
                                style={{ background: "#f0f0f0", marginTop: 20 }}
                                extra={[
                                    <Button key="s" onClick={() => navigate('/customer')} type="text">View All</Button>
                                ]}
                            >
                            </PageHeader>
                            <UnLawWorkTabel />

                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >

    )
}
