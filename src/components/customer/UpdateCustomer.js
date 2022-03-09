import React, { useEffect, useState } from 'react'
import { Modal, Select, Input, DatePicker, Row, Col, Form, Drawer, message, Switch } from 'antd';
import { Button } from 'antd';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
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

    const [idCardSet, setIdCardSet] = useState("0")
    const [landCardSet, setLandCardSet] = useState("0")
    const [footMeterSet, setFootMeterSet] = useState("0")
    const [idCardPlowerSet, setIdCardPlowerSet] = useState("0")
    const [familyBookSet, setFamilyBookSet] = useState("0")
    const [idCardNextBorderSet, setIdCardNextBorderSet] = useState("0")
    const [certificateCompanySet, setCertificateCompanySet] = useState("0")

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
        if (customer && visible) {
            form.setFieldsValue({
                ...customer,
                startDate: moment(customer?.startDate),
                endDate: customer?.endDate !=='0000-00-00' ? moment(customer?.endDate):null,
            })

            setIdCardSet(customer?.idCardSet)
            setLandCardSet(customer?.landCardSet)
            setFootMeterSet(customer?.footMeterSet)
            setIdCardPlowerSet(customer?.idCardPlowerSet)
            setFamilyBookSet(customer?.familyBookSet)
            setIdCardNextBorderSet(customer?.idCardNextBorderSet)
            setCertificateCompanySet(customer?.certificateCompanySet)
        }
    }, [customer,visible])

    const onFinish = async values => {
        // console.log(values);
        setLoading(true)
        let updateState = await Update_Customer(
            {
            ...values,
            idCardSet:idCardSet,
            landCardSet:landCardSet,
            footMeterSet:footMeterSet,
            idCardPlowerSet:idCardPlowerSet,
            familyBookSet:familyBookSet,
            idCardNextBorderSet:idCardNextBorderSet,
            certificateCompanySet:certificateCompanySet
            }
            , c_id
        );

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
                                    placeholder="ថ្ងៃចាប់ផ្ដើម"
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
                        
                    </Row>

                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="idCardSet"
                                label="អត្តសញ្ញាណប័ណ្ណបញ្ជាក់រួច 5ច្បាប់"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setIdCardSet(idCardSet==='1' ? '0':'1')}
                                    checked={idCardSet === '1'}
                                // defaultChecked
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="landCardSet"
                                label="បណ្ណដី បញ្ជាក់រួច 5ច្បាប់"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setLandCardSet(landCardSet==='1' ? '0':'1')}
                                    checked={landCardSet === '1'}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="footMeterSet"
                                label="ជើងម៉ែត្រ"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setFootMeterSet(footMeterSet==='1' ? '0':'1')}
                                    checked={footMeterSet === '1'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="idCardPlowerSet"
                                label="អត្តសញ្ញណប័ណ្ណអ្នកចាក់ដី"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setIdCardPlowerSet(idCardPlowerSet==='1' ? '0':'1')}
                                    checked={idCardPlowerSet === '1'}
                                />
                            </Form.Item>
                        </Col>


                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="familyBookSet"
                                label="សៀវភៅគ្រួសារ បញ្ជាក់ 5ច្បាប់ (បើមាន)"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setFamilyBookSet(familyBookSet==='1' ? '0':'1')}
                                    checked={familyBookSet === '1'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="idCardNextBorderSet"
                                label="អត្តសញ្ញាណប័ណ្ណអ្នកជាប់ព្រំ 5ច្បាប់"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setIdCardNextBorderSet(idCardNextBorderSet==='1' ? '0':'1')}
                                    checked={idCardNextBorderSet === '1'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Form.Item
                                name="certificateCompanySet"
                                label="វិញ្ញាប័ណ្ណប័ត្រក្រុមហ៊ុន បញ្ចាក់ 5ច្បាប់"
                            >
                                <Switch
                                    checkedChildren={<AiOutlineCheck />}
                                    unCheckedChildren={<AiOutlineClose />}
                                    onChange={(e) => setCertificateCompanySet(certificateCompanySet==='1' ? '0':'1')}
                                    checked={certificateCompanySet === '1'}
                                />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={10}>
                       
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
