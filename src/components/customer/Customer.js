import React from 'react'
import { Col, Row, Space, DatePicker } from 'antd';
import moment from 'moment';
import { Typography, Input, Button } from 'antd';
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
                marginLeft: "20px"
            }}
        >
            {/* Header ---------------------------------------------------- */}
            <Row>
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
            </Row>
            <Row>
                <Space size='middle'>
                    <Select placeholder="ការងារ" style={{ width: 190 }} >
                        <Option value="សាងសង់">សាងសង់</Option>
                        <Option value="រត់ច្បាប់">រត់ច្បាប់</Option>
                        <Option value="រត់ច្បាប់ & សាងសង់" >
                            រត់ច្បាប់ & សាងសង់
                        </Option>
                    </Select>
                    <Select placeholder="ប្រភេទ" style={{ width: 190 }} >
                        <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                        <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                        <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                        <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                        <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                        <Option value="សាងសង់">សាងសង់</Option>
                        <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                    </Select>
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

                <CraeteCustomer
                    setSuccess={setSuccess}
                />

            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
