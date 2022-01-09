import React, { useState } from 'react'
import { Modal, Select, Input, DatePicker, message, Row, Col, Space } from 'antd';
import { Button } from 'antd';
import { Creat_Customer } from '../../getDatabase'

const { Option } = Select;
const { TextArea } = Input;
export default function CraeteCustomer({
    setSuccess
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    };
    const [customer, setCustomer] = useState({
        constructionName: "",
        customerName: "",
        tel: "",
        gender: "",
        maritalStatus: "",
        partnerName: "",
        partnerGender: "",
        taskType: "",
        constructionType: "",
        constructionLocation: "",
        countFloor: "",
        mapLink: "",
        priority: "",
        showInDashboard: "",
        startDate: "",
        endDate: "",
        remark: "",
        customerId: ""
    });
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        Creat_Customer(
            customer.constructionName,
            customer.customerName,
            customer.tel,
            customer.gender,
            customer.maritalStatus,
            customer.partnerName,
            customer.partnerGender,
            customer.taskType,
            customer.constructionType,
            customer.constructionLocation,
            customer.countFloor,
            customer.mapLink,
            customer.priority,
            customer.showInDashboard,
            customer.startDate.format('YYYY-MM-DD'),
            customer.endDate.format('YYYY-MM-DD'),
            customer.remark,
        )
        message.success('បង្កើតជោជ័យ!');
        setCustomer("")
        setSuccess(true)
    };
    return (
        <div
            style={{
                position: "absolute",
                right: 0,
                marginRight: "20px"
            }}
        >
            <Button onClick={showModal} type="primary">+ បន្ថែមថ្មី</Button>
            <Modal
                title="បន្ថែមអតិថិជន"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="បង្កើត"
            >

                <Row>
                    <Space size="large">
                        <Col>
                            ឈ្មោះអតិថិជន
                            <Input
                                placeholder="ឈ្មោះអតិថិជន"
                                style={{ width: '220px' }}
                                size="large"
                                defaultValue={customer.customerName}
                                onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ភេទ
                            <Select placeholder="ភេទ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.gender}
                                onChange={(e) => setCustomer({ ...customer, gender: e })}
                            >
                                <Option value="ប្រុស">ប្រុស</Option>
                                <Option value="ស្រី">ស្រី</Option>
                            </Select>
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            លេខទូរស័ព្ទ
                            <Input
                                placeholder="លេខទូរស័ព្ទ"
                                style={{ width: '220px' }}
                                size="large"
                                type="number"
                                defaultValue={customer.tel}
                                onChange={(e) => setCustomer({ ...customer, tel: e.target.value })}
                            />
                        </Col>

                        <Col>
                            សម្ព័នភាព
                            <Select placeholder="សម្ព័នភាព" style={{ width: '220px' }} size="large"
                                defaultValue={customer.maritalStatus}
                                onChange={(e) => {
                                    if (e === "មានគ្រួសារ") {
                                        setMaritalStatus(true)
                                    } else {
                                        setMaritalStatus(false)
                                    }
                                    setCustomer({ ...customer, maritalStatus: e })
                                }}
                            >
                                <Option value="នៅលីវ">នៅលីវ</Option>
                                <Option value="មានគ្រួសារ">មានគ្រួសារ</Option>
                                <Option value="មេម៉ាយ">មេម៉ាយ</Option>
                                <Option value="ពោះម៉ាយ">ពោះម៉ាយ</Option>
                            </Select>
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row
                    style={
                        maritalStatus ? { display: "" } : { display: "none" }
                    }
                >
                    <Space size="large">
                        <Col>
                            ឈ្មោះ
                            <Input
                                placeholder="ឈ្មោះ"
                                style={{ width: '220px' }}
                                size="large"
                                defaultValue={customer.partnerName}
                                onChange={(e) => setCustomer({ ...customer, partnerName: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ភេទ
                            <Select placeholder="ភេទ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.partnerGender}
                                onChange={(e) => {
                                    setCustomer({ ...customer, partnerGender: e })
                                }}
                            >
                                <Option value="ប្រុស">ប្រុស</Option>
                                <Option value="ស្រី">ស្រី</Option>
                            </Select>
                        </Col>
                    </Space>
                </Row>
                < br
                    style={
                        maritalStatus ? { display: "" } : { display: "none" }
                    }
                />
                <Row>
                    <Space size="large">
                        <Col>
                            ការងារ
                            <Select placeholder="ការងារ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.taskType}
                                onChange={(e) => {
                                    setCustomer({ ...customer, taskType: e })
                                }}
                            >
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="រត់ច្បាប់">រត់ច្បាប់</Option>
                                <Option value="រត់ច្បាប់ & សាងសង់">រត់ច្បាប់ & សាងសង់</Option>
                            </Select>
                        </Col>

                        <Col>
                            ប្រភេទ
                            <Select placeholder="ប្រភេទ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.constructionType}
                                onChange={(e) => {
                                    setCustomer({ ...customer, constructionType: e })
                                }}
                            >
                                <Option value="ផ្ទះល្វែង">ផ្ទះល្វែង</Option>
                                <Option value="ភូមិគ្រិះ">ភូមិគ្រិះ</Option>
                                <Option value="ឃ្លាំង">ឃ្លាំង</Option>
                                <Option value="ស្ថានីយប្រេង">ស្ថានីយប្រេង</Option>
                                <Option value="កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍">កាត់ប្លង់ផ្ទះល្វែង ដីឡូត៍</Option>
                                <Option value="សាងសង់">សាងសង់</Option>
                                <Option value="ផ្សេងៗ">ផ្សេងៗ</Option>
                            </Select>
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            ឈ្មោះការដ្ឋាន
                            <Input
                                placeholder="ឈ្មោះការដ្ឋាន"
                                style={{ width: '220px' }}
                                size="large"
                                defaultValue={customer.constructionName}
                                onChange={(e) => setCustomer({ ...customer, constructionName: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ចំនួនជាន់
                            <Input
                                placeholder="ចំនួនជាន់"
                                style={{ width: '220px' }}
                                size="large"
                                type="number"
                                defaultValue={customer.countFloor}
                                onChange={(e) => setCustomer({ ...customer, countFloor: e.target.value })}
                            />
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    ទីតាំងគម្រោង
                    <Input
                        placeholder="ទីតាំងគម្រោង"
                        size="large"
                        defaultValue={customer.constructionLocation}
                        onChange={(e) => setCustomer({ ...customer, constructionLocation: e.target.value })}
                    />
                </Row>
                < br />
                <Row>
                    Google Mape
                    <Input
                        placeholder="URL"
                        size="large"
                        defaultValue={customer.mapLink}
                        onChange={(e) => setCustomer({ ...customer, mapLink: e.target.value })}
                    />
                </Row>
                < br />
                <Row>
                    <Space size="large">

                        <Col>
                            លក្ខខ័ណ
                            <Select placeholder="លក្ខខ័ណ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.priority}
                                onChange={(e) => {
                                    setCustomer({ ...customer, priority: e })
                                }}
                            >
                                <Option value="បន្ទាន់">បន្ទាន់</Option>
                                <Option value="មិនមានរួចរាល់">មិនមានរួចរាល់</Option>
                                <Option value="មានបញ្ហា">មានបញ្ហា</Option>
                                <Option value="រងចាំ">រងចាំ</Option>
                                <Option value="រួចរាល់">រួចរាល់</Option>
                                <Option value="បញ្ចប់">បញ្ចប់</Option>
                            </Select>
                        </Col>
                        <Col>
                            បង្ហាញ
                            <Select placeholder="បង្ហាញ" style={{ width: '220px' }} size="large"
                                defaultValue={customer.showInDashboard}
                                onChange={(e) => {
                                    setCustomer({ ...customer, showInDashboard: e })
                                }}
                            >
                                <Option value="1">Yes</Option>
                                <Option value="0">No</Option>
                            </Select>
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            ថ្ងៃចាប់ផ្ដើម
                            <DatePicker
                                size="large"
                                style={{ width: '220px' }}
                                defaultValue={customer.startDate}
                                onChange={(e) => setCustomer({ ...customer, startDate: e })}

                            />
                        </Col>
                        <Col>
                            ថ្ងៃបញ្ចប់
                            <DatePicker
                                size="large"
                                style={{ width: '220px' }}
                                defaultValue={customer.endDate}
                                onChange={(e) => setCustomer({ ...customer, endDate: e })}
                            />

                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    ផ្សេងៗ
                    <TextArea
                        rows={4}
                        defaultValue={customer.remark}
                        onChange={(e) => setCustomer({ ...customer, remark: e.target.value })}
                    />
                </Row>

            </Modal>
        </div >
    )
}
