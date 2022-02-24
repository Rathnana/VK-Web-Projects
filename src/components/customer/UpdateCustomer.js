import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, DatePicker, Row, Col, Form, Drawer, message } from 'antd';
import { Button } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';
import { Update_Customer } from '../../getDatabase';

const { Option } = Select;
const { TextArea } = Input;

export default function UpdateCustomer({
    setSuccess,
    c_id,
    customer

}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 960) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const [maritalStatus, setMaritalStatus] = useState(
        customer?.maritalStatus === "មានគ្រួសារ" ? true : false
    )
    useEffect(() => {
        if (customer) {
            form.setFieldsValue({
                ...customer,
                startDate: moment(customer?.startDate),
                endDate: moment(customer?.endDate),
            })
        }
    }, [customer])

    const onFinish = async values => {
        // console.log(values);
        setLoading(true)
        let updateState = await Update_Customer(values, c_id);

        if (updateState) {
            setVisible(false);
            form.resetFields()
            message.success('ជោជ័យ!');
            setSuccess(true)
            setLoading(false)
        } else {
            setLoading(false)
        }

    };

    return (
        <div>
            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />

            <Drawer
                width={isMobile ? '100%' : 736}
                title="កែប្រែអតិថិជន"
                placement="right"
                onClose={onClose}
                visible={visible}
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
                            // rules={[{ required: true, message: "សូមបំពេញលេខប័ណ្ណដី!!" }]}
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
                        <Col xs={10} sm={10} md={10} lg={10} xl={10} >
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
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} >
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

                        <Col xs={10} sm={10} md={10} lg={10} xl={10} >
                            <Form.Item
                                name="idNumber"
                                label="លេខអត្តសញ្ញាណប័ណ្ណ"
                                // rules={[{ required: true, message: "សូមបំពេញឈ្មោះ!!" }]}
                            >
                                <Input
                                    placeholder='លេខអត្តសញ្ញាណប័ណ្ណ'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="tel"
                                label="លេខទូរស័ព្ទ"
                                // rules={[{ required: true, message: "សូមបំពេញលេខទូរស័ព្ទ!!" }]}
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
                                // rules={[{ required: true, message: "សូមជ្រើសរើសសម្ព័នភាព!!" }]}

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
                            <Row gutter={10}>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} >
                                    <Form.Item
                                        name="partnerName"
                                        label="ឈ្មោះដៃគូរ"
                                        // rules={[{ required: true, message: "សូមបំពេញឈ្មោះ!!" }]}
                                    >
                                        <Input
                                            placeholder='ឈ្មោះ'
                                            size='large'
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Form.Item
                                        name="partnerGender"
                                        label="ភេទ"
                                        // rules={[{ required: true, message: "សូមជ្រើសរើសភេទ!!" }]}
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

                                <Col xs={10} sm={10} md={10} lg={10} xl={10} >
                                    <Form.Item
                                        name="partnerIdNumber"
                                        label="លេខអត្តសញ្ញាណប័ណ្ណ"
                                        // rules={[{ required: true, message: "សូមបំពេញឈ្មោះ!!" }]}
                                    >
                                        <Input
                                            placeholder='លេខអត្តសញ្ញាណប័ណ្ណ'
                                            size='large'
                                            allowClear
                                        />
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
                                    <Option value="រត់ច្បាប់&សង់">រត់ច្បាប់&សង់</Option>
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
                                    <Option value="ភោជនីយដ្ឋាន">ភោជនីយដ្ឋាន</Option>
                                    <Option value="អភិវឌ្ឍន៍ដី">អភិវឌ្ឍន៍ដី</Option>
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
                                // rules={[{ required: true, message: "សូមបំពេញចំនួនជាន់!!" }]}
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
                                // rules={[{ required: true, message: "សូមបំពេញទីតាំងគម្រោង!!" }]}
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
                                    <Option value="ធ្វើសៀវភៅ">ធ្វើសៀវភៅ</Option>
                                    <Option value="នៅក្រុង">នៅក្រុង</Option>
                                    <Option value="នៅមន្ទីរ">នៅមន្ទីរ</Option>
                                    <Option value="កំពុងសាងសង់">កំពុងសាងសង់</Option>
                                    <Option value="ផ្អាក">ផ្អាក</Option>
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
                                // rules={[{ required: true, message: "សូមជ្រើសរើសថ្ងៃបញ្ចប់!!" }]}
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
                            // rules={[{ required: true, message: "សូមបំពេញឈ្មោះមន្ត្រី!!" }]}
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
                    </Row>


                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" size='large' loading={loading}>
                                    កែតម្រូវ
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}
