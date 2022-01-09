import React from 'react'
import { Row, Typography, Col, Button, Space, Input } from 'antd';
import AddUser from './AddUser';
import UsersTable from './UsersTable';

const { Title } = Typography;
export default function Users() {
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
                    {`អ្នកប្រើប្រាស់`}
                </Title>
                <Row>
                    <Col>
                        <Title level={5}>
                            <Space size='middle'>

                                <Input placeholder="ឈ្មោះ" />
                                <Button type="primary">ស្វែងរក</Button>
                                <AddUser />
                            </Space>
                        </Title>
                    </Col>
                </Row>
            </Col>

            <Col
                xs={24} sm={24} md={24} lg={24} xl={24}
            >
                <UsersTable />
            </Col>
        </Row>
    )
}
