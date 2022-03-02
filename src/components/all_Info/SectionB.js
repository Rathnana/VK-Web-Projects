import React from 'react'
import { Col, PageHeader, Button } from 'antd';
import RequestTabel from './RequestTabel';
import { useNavigate } from "react-router-dom";
import WorkerGraph from './WorkerGraph';


export default function SectionB() {
    let navigate = useNavigate();
    return (
        <Col
            xs={8} sm={8} md={8} lg={8} xl={8}
            // className="site-card-wrapper"
            style={{ padding: '0px 20px' }}
        >
           
            <WorkerGraph />
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
