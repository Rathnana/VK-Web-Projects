import React from 'react'
import { Col, PageHeader, Button } from 'antd';
import UnLawWorkTabel from './UnLawWorkTabel';
import RequestTabel from './RequestTabel';
export default function SectionB() {
    return (
        <Col
            xs={12} sm={12} md={12} lg={12} xl={12}
            // className="site-card-wrapper"
            style={{ marginTop: 20, padding: 10 }}
        >
            <PageHeader
                ghost={false}
                title="ព័ត៌មានសរុប"
                style={{ background: "#f0f0f0" }}
                extra={[
                    <Button key="3" type="text">View All</Button>
                ]}
            >

            </PageHeader>
            <UnLawWorkTabel />
            <PageHeader
                ghost={false}
                title="ព័ត៌មានសរុប"
                style={{ background: "#f0f0f0", marginTop: 40 }}
                extra={[
                    <Button key="s" type="text">View All</Button>
                ]}
            >
            </PageHeader>
            <RequestTabel />
        </Col>
    )
}
