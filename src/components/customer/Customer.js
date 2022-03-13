import React from 'react'
import { Col, Row } from 'antd';
import { Typography, Button, Form } from 'antd';
import { Select } from 'antd';
import CustomerTable from './CustomerTable';
import CraeteCustomer from './CraeteCustomer';

const { Option } = Select;
const { Title } = Typography;

export default function Customer({ search }) {
    const [form] = Form.useForm();
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [taskType, setTaskType] = React.useState('');
    const [constructionType, setConstructionType] = React.useState('');
    const [priority, setPriority] = React.useState('');

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
                    <Form
                        form={form}
                        id='customer-filter-form'
                    >
                        <Row>
                            <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{ padding: 5 }}>
                                <Form.Item
                                    name="TaskType"
                                // label="ការងារ"
                                >
                                    <Select placeholder="ការងារ" size='large' style={{ width: '100%' }}
                                        onChange={(e) => setTaskType(e)}
                                    >
                                        <Option value="សាងសង់">សាងសង់</Option>
                                        <Option value="រត់ច្បាប់">រត់ច្បាប់</Option>
                                        <Option value="រត់ច្បាប់&សង់">រត់ច្បាប់&សង់</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{ padding: 5 }}>
                                <Form.Item
                                    name="ConstructionType"
                                // label="ប្រភេទ"
                                >
                                    <Select placeholder="ប្រភេទ" size='large' style={{ width: '100%' }} onChange={e => setConstructionType(e)} >
                                        <Option value={''} key='all'>--ទាំងអស់--</Option>
                                        <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                        <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                        <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                        <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                        <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍">កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍</Option>
                                        <Option value="សាងសង់">សាងសង់</Option>
                                        <Option value="ភោជនីយដ្ឋាន">ភោជនីយដ្ឋាន</Option>
                                        <Option value="អភិវឌ្ឍន៍ដី">អភិវឌ្ឍន៍ដី</Option>
                                        <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                                    </Select>
                                </Form.Item >
                            </Col>
                            <Col xs={24} sm={24} md={5} lg={5} xl={4} style={{ padding: 5 }}>
                                <Form.Item
                                    name="Priority"
                                // label="ស្ថានភាព"
                                >
                                    <Select placeholder="ស្ថានភាព" size='large' style={{ width: '100%' }} onChange={e => setPriority(e)} >
                                        <Option value={''} key='all'>--ទាំងអស់--</Option>
                                        <Option value="មិនទាន់បញ្ចប់">មិនទាន់បញ្ចប់</Option>
                                        <Option value="គូសប្លង់">គូសប្លង់</Option>
                                        <Option value="ចៅសង្កាត់">ចៅសង្កាត់</Option>
                                        <Option value="ធ្វើសៀវភៅ">ធ្វើសៀវភៅ</Option>
                                        <Option value="នៅក្រុង">នៅក្រុង</Option>
                                        <Option value="នៅមន្ទីរ">នៅមន្ទីរ</Option>
                                        <Option value="កំពុងសាងសង់">កំពុងសាងសង់</Option>
                                        <Option value="ផ្អាក">ផ្អាក</Option>
                                        <Option value="បញ្ចប់">បញ្ចប់</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={3} lg={3} xl={3} style={{ padding: 5 }}>
                                <Button onClick={() => {

                                    form.resetFields();
                                    setConstructionType(null);
                                    setTaskType(null);
                                    setPriority(null);
                                }}
                                    type="primary"
                                    size='large'
                                    style={{ width: '100%' }}
                                >
                                    Reset
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={{ span: 4, offset: 2 }} lg={{ span: 4, offset: 2 }} xl={{ span: 3, offset: 6 }} style={{ padding: 5 }}>
                                <CraeteCustomer
                                    setSuccess={setSuccess}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col
                    xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <CustomerTable
                        setLoading={setLoading}
                        loading={loading}
                        setSuccess={setSuccess}
                        success={success}
                        taskType={taskType}
                        priority={priority}
                        constructionType={constructionType}
                        search={search}
                    />
                </Col>
            </Row>
        </div>
    )
}
