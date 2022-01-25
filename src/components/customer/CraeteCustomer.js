import React, { useState } from 'react'
import { Modal, Select, Input, DatePicker, Row, Col, Form, message } from 'antd';
import { Button } from 'antd';
import { Creat_Customer } from '../../getDatabase'

const { Option } = Select;
const { TextArea } = Input;
export default function CraeteCustomer({
    setSuccess
}) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState(false)
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const onFinish = async values => {

        // setSuccess(true)
        setLoading(true)
        console.log(values);
        let CreatCustomer = await Creat_Customer(values);

        if (CreatCustomer) {
            setIsModalVisible(false);
            form.resetFields()
            message.success('ជោជ័យ!');
            setSuccess(true)
            setLoading(false)
        } else {
            message.error('បង្កើតមានបញ្ហា!!')
            setLoading(false)
        }

    };

    return (
        <>
            <Button onClick={showModal} type="primary" size='large' style={{width:'100%'}}>+ បន្ថែមថ្មី</Button>
            <Modal
                title="បង្កើតអតិថិជន"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                okText="បង្កើត"
                cancelText="បោះបង់"
                footer={null}
            // okButtonProps={{ form: 'create-customer-form', key: 'submit', htmlType: 'submit' }}
            >
                <Form
                    form={form}
                    id='create-customer-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="landNumber"
                                label="លេខប័ណ្ណដី"
                                rules={[{ required: true, message: "សូមបំពេញលេខប័ណ្ណដី!!" }]}
                            >
                                <Input
                                    placeholder='លេខប័ណ្ណដី'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="customerName"
                                label="ឈ្មោះអតិថិជន"
                                rules={[{ required: true, message: "សូមបំពេញឈ្មោះអតិថិជន!!" }]}
                            >
                                <Input
                                    placeholder='ឈ្មោះអតិថិជន'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="gender"
                                label="ភេទ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសភេទ!!" }]}
                            >
                                <Select
                                    placeholder="ភេទ"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="ប្រុស">ប្រុស</Option>
                                    <Option value="ស្រី">ស្រី</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="tel"
                                label="លេខទូរស័ព្ទ"
                                rules={[{ required: true, message: "សូមបំពេញលេខទូរស័ព្ទ!!" }]}
                            >
                                <Input
                                    placeholder='លេខទូរស័ព្ទ'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="maritalStatus"
                                label="សម្ព័នភាព"
                                rules={[{ required: true, message: "សូមជ្រើសរើសសម្ព័នភាព!!" }]}

                            >
                                <Select
                                    placeholder="សម្ព័នភាព"
                                    size="large"
                                    allowClear
                                    onChange={(e) => {
                                        if (e === "មានគ្រួសារ") {
                                            setMaritalStatus(true)
                                        } else {
                                            setMaritalStatus(false)
                                        }
                                    }}
                                >
                                    <Option value="នៅលីវ">នៅលីវ</Option>
                                    <Option value="មានគ្រួសារ">មានគ្រួសារ</Option>
                                    <Option value="មេម៉ាយ">មេម៉ាយ</Option>
                                    <Option value="ពោះម៉ាយ">ពោះម៉ាយ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        maritalStatus ?
                            <Row
                                gutter={10}

                            >
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Form.Item
                                        name="partnerName"
                                        label="ឈ្មោះ"
                                        rules={[{ required: true, message: "សូមបំពេញឈ្មោះ!!" }]}
                                    >
                                        <Input
                                            placeholder='ឈ្មោះ'
                                            size='large'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Form.Item
                                        name="partnerGender"
                                        label="ភេទ"
                                        rules={[{ required: true, message: "សូមជ្រើសរើសភេទ!!" }]}
                                    >
                                        <Select
                                            placeholder="ភេទ"
                                            size="large"
                                            allowClear
                                        >
                                            <Option value="ប្រុស">ប្រុស</Option>
                                            <Option value="ស្រី">ស្រី</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            : null
                    }

                    <Row
                        gutter={10}
                    >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="taskType"
                                label="ការងារ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសការងារ!!" }]}
                            >
                                <Select
                                    placeholder="ការងារ"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="សាងសង់">សាងសង់</Option>
                                    <Option value="រត់ច្បាប់">រត់ច្បាប់</Option>
                                    <Option value="រត់ច្បាប់ & សាងសង់">រត់ច្បាប់ & សាងសង់</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="constructionType"
                                label="ប្រភេទ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសប្រភេទ!!" }]}
                            >
                                <Select
                                    placeholder="ប្រភេទ"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                    <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                    <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                    <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                    <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍">កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍</Option>
                                    <Option value="សាងសង់">សាងសង់</Option>
                                    <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="constructionName"
                                label="ឈ្មោះការដ្ឋាន"
                                rules={[{ required: true, message: "សូមបំពេញឈ្មោះការដ្ឋាន!!" }]}
                            >
                                <Input
                                    placeholder='ឈ្មោះការដ្ឋាន'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="countFloor"
                                label="ចំនួនជាន់"
                                rules={[{ required: true, message: "សូមបំពេញចំនួនជាន់!!" }]}
                            >
                                <Input
                                    placeholder='ចំនួនជាន់'
                                    size='large'
                                    type="number"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="constructionLocation"
                                label="ទីតាំងគម្រោង"
                                rules={[{ required: true, message: "សូមបំពេញទីតាំងគម្រោង!!" }]}
                            >
                                <Input
                                    placeholder='ទីតាំងគម្រោង'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="mapLink"
                                label="Google Mape"
                            // rules={[{ required: true, message: "សូមបំពេញ URL!!" }]}
                            >
                                <Input
                                    placeholder='URL'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={10}
                    >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="priority"
                                label="ស្ថានភាព"
                                rules={[{ required: true, message: "សូមជ្រើសរើសស្ថានភាព!!" }]}
                            >
                                <Select
                                    placeholder="ស្ថានភាព"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="គូសប្លង់">គូសប្លង់</Option>
                                    <Option value="ចៅសង្កាត់">ចៅសង្កាត់</Option>
                                    <Option value="ពិនិត្យ&កែតម្រូវ">ពិនិត្យ&កែតម្រូវ</Option>
                                    <Option value="ធ្វើសៀវភៅ">ធ្វើសៀវភៅ</Option>
                                    <Option value="នៅក្រុង">នៅក្រុង</Option>
                                    <Option value="រួចរាល់">រួចរាល់</Option>
                                    <Option value="បញ្ចប់">បញ្ចប់</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="showInDashboard"
                                label="បង្ហាញ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសការបង្ហាញ!!" }]}
                            >
                                <Select
                                    placeholder="បង្ហាញ"
                                    size="large"
                                    allowClear
                                >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>

                    <Row
                        gutter={10}
                    >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="startDate"
                                label="ថ្ងៃចាប់ផ្ដើម"
                                rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃចាប់ផ្ដើម!!" }]}
                            >

                                <DatePicker
                                    placeholder="ថ្ងៃបញ្ចប់"
                                    size="large"
                                    style={{ width: '100%' }}

                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="endDate"
                                label="ថ្ងៃបញ្ចប់"
                                rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃបញ្ចប់!!" }]}
                            >

                                <DatePicker
                                    placeholder="ថ្ងៃបញ្ចប់"
                                    size="large"
                                    style={{ width: '100%' }}

                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="landOfficerName"
                                label="ឈ្មោះមន្ត្រី"
                                rules={[{ required: true, message: "សូមបំពេញឈ្មោះមន្ត្រី!!" }]}
                            >
                                <Input
                                    placeholder='ឈ្មោះមន្ត្រី'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="remark"
                                label="ផ្សេងៗ"
                            >
                                <TextArea
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item

                            >
                                <Button type='primary' htmlType='submit' loading={loading}>
                                    បង្កើត
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </ >
    )
}
