import React from 'react'
import { Col, Row, Space, DatePicker } from 'antd';
import moment from 'moment';
import { Typography, Input, Button } from 'antd';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Title } = Typography;
export default function UnLawWork() {
    return (
        <div>
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
                        {`ព័ត៌មានតាមការដ្ឋាន`}
                    </Title>
                    <Row>​
                        <Col>
                            <Title level={5}>
                                <Space size='middle'>
                                    <Input placeholder="ឈ្មោះការដ្ឋាន" />
                                    <DatePicker placeholder="កាលបរិច្ឆេទ" defaultValue={moment()} format={dateFormatList} />
                                    <Button type="primary">OK</Button>
                                </Space>
                            </Title>
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                </Col>
            </Row>
        </div>
    )
}
