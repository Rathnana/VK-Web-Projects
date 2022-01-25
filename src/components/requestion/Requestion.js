
import React from 'react'
import { Col, Row, Space, DatePicker, Select } from 'antd';
import moment from 'moment';
import { Typography, Input, Button } from 'antd';
import RequestionTable from './RequestionTable';
import CreateRequest from './CreateRequest';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Title } = Typography;
const { Option } = Select;
export default function Requestion() {
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
                        {`តារាងស្នើរសុំសម្ភារៈ`}
                    </Title>
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={5} xl={4} style={{ padding: 5 }}>

                            <Select placeholder="ឈ្មោះការដ្ឋាន" size='large' style={{ width: '100%' }} >
                                <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍">ភូមិគ្កាត់ប្លង់ផ្ទះល្វែង ដីឡូគ៍</Option>
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                            </Select>

                        </Col>
                        <Col xs={24} sm={24} md={6} lg={5} xl={4} style={{ padding: 5 }}>

                            <DatePicker placeholder="កាលបរិច្ឆេទ" size='large' style={{ width: '100%' }} defaultValue={moment()} format={dateFormatList} />

                        </Col>
                        <Col xs={24} sm={24} md={4} lg={3} xl={3} style={{ padding: 5 }}>

                            <Button type="primary" size='large' style={{ width: '100%' }}>Reset</Button>

                        </Col>
                        <Col xs={24} sm={24} md={{span:4,offset:4}} lg={{span:4,offset:7}} xl={{span:3,offset:10}} style={{padding:5}}>
                            <CreateRequest
                                setSuccess={setSuccess}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >

                    <RequestionTable
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
