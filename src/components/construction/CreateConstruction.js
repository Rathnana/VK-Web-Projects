import React, { useState } from 'react'
import { Modal, Select, Input, message, DatePicker, Row, Col, Space } from 'antd';
import { Button } from 'antd';
import { Creat_Construction } from '../../getDatabase'


const { Option } = Select;

export default function CreateConstruction({ setSuccess }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [construction, setConstruction] = useState({
        constructionName: '',
        customerId: '',
        customerName: '',
        customerNumber: '',
        c_address: '',
        constructingType: '',
        countFloor: '',
        startDate: '',
        endDate: '',
        c_remark: '',
        c_status: ''

    })
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {


        if (construction.constructionName === ""
            && construction.startDate === ""
            && construction.endDate === ""
            && construction.customerName === ""
        ) {
            message.error('សូមទិន្នន័យសំខាន់ៗ');
        } else {

            setIsModalVisible(false);
            Creat_Construction(
                construction.constructionName,
                construction.customerId,
                construction.customerName,
                construction.customerNumber,
                construction.c_address,
                construction.constructingType,
                construction.countFloor,
                construction.startDate.format('YYYY-MM-DD'),
                construction.endDate.format('YYYY-MM-DD'),
                construction.c_remark,
                construction.c_status
            )

            message.success('ស្នើសុំជោជ័យ!');
            setConstruction({
                constructionName: '',
                customerId: '',
                customerName: '',
                customerNumber: '',
                c_address: '',
                constructingType: '',
                countFloor: '',
                startDate: '',
                endDate: '',
                c_remark: '',
                c_status: ''

            })
            setSuccess(true)
        }

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>

            <Button style={{ position: "absolute", right: 0 }} onClick={showModal} type="primary">+ បន្ថែមថ្មី</Button>
            <Modal
                title="បន្ថែមការដ្ឋាន"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="បង្កើត"
            >

                <Row>
                    <Space size="large">
                        <Col>
                            ID
                            <Input
                                placeholder="បញ្ជូល ID"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.customerId}
                                onChange={(e) => setConstruction({ ...construction, customerId: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ឈ្មោះការដ្ខាន
                            <Input
                                placeholder="ឈ្មោះការដ្ខាន"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.constructionName}
                                onChange={(e) => setConstruction({ ...construction, constructionName: e.target.value })}
                            />
                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            ប្រភេទ
                            <Input
                                placeholder="ប្រភេទ"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.constructingType}
                                onChange={(e) => setConstruction({ ...construction, constructingType: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ជាន់
                            <Input
                                placeholder="ជាន់"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.countFloor}
                                onChange={(e) => setConstruction({ ...construction, countFloor: e.target.value })}
                            />
                        </Col>
                    </Space>
                </Row>
                < br />
                <div>ទីតាំង</div>
                <Input
                    placeholder="ទីតាំង"
                    size="large"
                    value={construction.c_address}
                    onChange={(e) => setConstruction({ ...construction, c_address: e.target.value })}
                />
                < br />
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            ថ្ងៃចាប់ផ្ដើម
                            <DatePicker
                                size="large"
                                style={{ width: '220px' }}
                                value={construction.startDate}
                                placeholder="ថ្ងៃចាប់ផ្ដើម"
                                onChange={(e) => setConstruction({ ...construction, startDate: e })}
                            />
                        </Col>
                        <Col>
                            ថ្ងៃបញ្ចប់
                            <DatePicker
                                size="large"
                                style={{ width: '220px' }}
                                value={construction.endDate}
                                placeholder="ថ្ងៃបញ្ចប់"
                                onChange={(e) => setConstruction({ ...construction, endDate: e })}
                            />

                        </Col>
                    </Space>
                </Row>
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            ស្ថានភាព
                            <Input
                                placeholder="ស្ថានភាព"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.c_status}
                                onChange={(e) => setConstruction({ ...construction, c_status: e.target.value })}
                            />
                        </Col>
                        <Col>
                            ផ្សេងៗ
                            <Input
                                placeholder="ផ្សេងៗ"
                                style={{ width: '220px' }}
                                size="large"
                                value={construction.c_remark}
                                onChange={(e) => setConstruction({ ...construction, c_remark: e.target.value })}
                            />
                        </Col>
                    </Space>
                </Row>
            </Modal>
        </div >
    )
}
