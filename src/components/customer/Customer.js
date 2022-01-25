import React from 'react'
import { Col, Row, Space } from 'antd';
import { Typography, Button } from 'antd';
import { Select } from 'antd';
import CustomerTable from './CustomerTable';
import CraeteCustomer from './CraeteCustomer';

const { Option } = Select;
const { Title } = Typography;

export default function Customer() {

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
                        {`តារាងទិន្នន័យអតិថិជន`}
                    </Title>
                    <Row>
                        <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{padding:5}}>
                            <Select placeholder="ការងារ" size='large' style={{ width: '100%' }} >
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="រត់ច្បាប់">រត់ច្បាប់</Option>
                                <Option value="រត់ច្បាប់ & សាងសង់" >
                                    រត់ច្បាប់ & សាងសង់
                                </Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{padding:5}}>

                            <Select placeholder="ប្រភេទ" size='large' style={{ width: '100%' }} >
                                <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                            </Select>

                        </Col>
                        <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{padding:5}}>

                            <Select placeholder="ស្ថានភាព" size='large' style={{ width: '100%' }} >
                                <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                            </Select>

                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3} style={{padding:5}}>
                            <Button type="primary" size='large' style={{ width: '100%' }}>Reset</Button>
                        </Col>
                        <Col xs={24} sm={24} md={{span:4,offset:2}} lg={{span:4,offset:2}} xl={{span:3,offset:6}} style={{padding:5}}>
                            <CraeteCustomer
                                setSuccess={setSuccess}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <CustomerTable
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
