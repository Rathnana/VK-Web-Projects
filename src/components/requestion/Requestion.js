
import React from 'react'
import { Col, Row, Space, DatePicker } from 'antd';
import moment from 'moment';
import { Typography, Input, Button } from 'antd';
import RequestionTable from './RequestionTable';
import CreateRequest from './CreateRequest';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Title } = Typography;
export default function Requestion() {
    return (
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
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Title level={5}>
                            <Space size='middle'>
                                <Input placeholder="ឈ្មោះការដ្ឋាន" />
                                <DatePicker placeholder="កាលបរិច្ឆេទ" defaultValue={moment()} format={dateFormatList} />
                                <Button type="primary">OK</Button>
                            </Space>
                        </Title>
                    </Col>
                    <Col
                        xs={12} sm={12} md={12} lg={12} xl={12}
                        className="create-request"
                    >
                        <CreateRequest />
                    </Col>
                </Row>
            </Col>

            <Col
                xs={24} sm={24} md={24} lg={24} xl={24}
            >
                <RequestionTable />
            </Col>
        </Row>
    )
}
