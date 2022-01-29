import React from 'react'
import { Col, PageHeader, Button } from 'antd';
import UnLawWorkTabel from './UnLawWorkTabel';
import RequestTabel from './RequestTabel';
import { useNavigate } from "react-router-dom";


export default function SectionB() {
    let navigate = useNavigate();
    return (
        <Col
            xs={24} sm={24} md={12} lg={12} xl={12}
            // className="site-card-wrapper"
            style={{ padding: '0px 20px' }}
        >
            <PageHeader
                ghost={false}
                title="ការដ្ឋាន"
                style={{ background: "#f0f0f0" }}
                extra={[
                    <Button key="s" onClick={() => navigate('/customer')} type="text">View All</Button>
                ]}
            >

            </PageHeader>
            <UnLawWorkTabel />
            <PageHeader
                ghost={false}
                title="តារាងស្នើរសុំសម្ភារៈ"
                style={{ background: "#f0f0f0", marginTop: 20 }}
                extra={[
                    <Button key="s" onClick={() => navigate('/requesting')} type="text">View All</Button>
                ]}
            >
            </PageHeader>
            <RequestTabel />
        </Col>
    )
}
