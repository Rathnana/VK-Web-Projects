import React from 'react'
import { Col, Row, Space } from 'antd';
import { Typography, Button } from 'antd';
import { Select } from 'antd';
import CreatePettyCash from './CreatePettyCash'
import PettyCashTable from './PettyCashTable';

const { Option } = Select;
const { Title } = Typography;

export default function PettyCash() {

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
                        {`តារាង Pretty Cash`}
                    </Title>
                    <Row>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Space>
                                <Select placeholder="ស្ថានភាព" style={{ width: 190 }} >
                                    <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                    <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                    <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                    <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                    <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                                    <Option value="សាងសង់">សាងសង់</Option>
                                    <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                                </Select>
                                <Button type="primary">Reset</Button>
                            </Space>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}

                        >
                            <CreatePettyCash
                                setSuccess={setSuccess}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >

                    <PettyCashTable
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
