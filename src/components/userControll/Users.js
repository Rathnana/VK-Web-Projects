import React from 'react'
import { Col, Row, Space } from 'antd';
import { Typography, Button } from 'antd';
import { Select } from 'antd';
import AddUser from './AddUser';
import UsersTable from './UsersTable';
const { Option } = Select;
const { Title } = Typography;
export default function Users() {
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
                        {`អ្នកប្រើប្រាស់`}
                    </Title>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={6} xl={4} style={{ padding: 5 }}>

                            <Select placeholder="ស្វែងរកឈ្មោះ" size='large' style={{ width: '100%' }} >
                                <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                            </Select>

                        </Col>
                        <Col xs={24} sm={24} md={4} lg={3} xl={3} style={{ padding: 5 }}>

                            <Button type="primary" size='large' style={{ width: '100%' }}>Reset</Button>

                        </Col>
                        <Col xs={24} sm={24} md={{span:6,offset:6}} lg={{span:5,offset:10}} xl={{span:5,offset:12}} style={{padding:5}} >

                            <AddUser
                                setSuccess={setSuccess}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <UsersTable
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
