import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Row, Col, Select, Drawer,InputNumber } from 'antd';
import { Button } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';
import { Update_PettyCash } from '../../getDatabase';
import { convertKHRtoUSD, convertUSDtoKHR, currencyFormatKHR } from '../../own-comp';

const { Option } = Select;
export default function UpdatePettyCash({
    setSuccess,
    pc_id,
    pettyCash
}) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)

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
    const onFinish = async (values) => {
        setLoading(true)
        let updateState = await Update_PettyCash(values, pc_id);
        if (updateState) {
            setVisible(false);
            setSuccess(true)
            setLoading(false)
        } else {
            setLoading(false)
        }

    };
    useEffect(() => {
        form.setFieldsValue({
            date: moment(pettyCash?.date),
            borrowPerson: pettyCash?.borrowPerson,
            remark: pettyCash?.remark,
            totalCash: pettyCash?.totalCash,
            totalCashKh: convertUSDtoKHR(pettyCash?.totalCash),
            status: pettyCash?.status
        })
    }, [])

    const handleInputUSD = (e) => {
        let khr = convertUSDtoKHR(e)
        form.setFieldsValue({
            totalCashKh: khr
        })
    }

    const handleInputKH = (e) => {
        let usd = convertKHRtoUSD(e)
        form.setFieldsValue({
            totalCash: usd
        })
    }

    return (
        <div>
            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />
            <Drawer
                width={isMobile ? '100%' : 736}
                title="Edit Petty Cash"
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <Form
                    form={form}
                    id='edit-petty-cash-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="date"
                                label="កាលបរិច្ឆេទ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសកាលបរិច្ឆេទ!!" }]}
                            >
                                <DatePicker
                                    placeholder="កាលបរិច្ឆេទ"
                                    size="large"
                                    style={{ width: '100%' }}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="borrowPerson"
                                label="ឈ្មោះអ្នកខ្ចី"
                                rules={[{ required: true, message: "សូមបំពេញឈ្មោះអ្នកខ្ចី!!" }]}
                            >
                                <Input
                                    placeholder="ឈ្មោះអ្នកខ្ចី"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>


                    </Row>
                    <Row gutter={10}>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="totalCashKh"
                                label="ចំនួនទឹកប្រាក់ (KHR)"
                                rules={[{ required: true, message: "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="KHR"
                                    style={{ width: '100%' }}
                                    onKeyUp={(e) => handleInputKH(e.target.value)}
                                    onStep={(e) => handleInputKH(e)}
                                    step={100}
                                    size="large"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="totalCash"
                                label="ចំនួនទឹកប្រាក់ (USD)"
                                rules={[{ required: true, message: "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="USD"
                                    style={{ width: '100%' }}
                                    onKeyUp={(e) => handleInputUSD(e.target.value)}
                                    onStep={(e) => handleInputUSD(e)}
                                    size="large"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                name="status"
                                label="ស្ថានភាព"
                                rules={[{ required: true, message: "សូមជ្រើសរើសស្ថានភាព!!" }]}
                            >
                                <Select
                                    // defaultValue={pettyCash.}
                                    // style={{ width: "100%" }}
                                    placeholder="ស្ថានភាព"
                                    size='large'
                                >
                                    <Option value="បានទូរទាត់">បានទូរទាត់</Option>
                                    <Option value="មិនទាន់ទូរទាត់">មិនទាន់ទូរទាត់</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="remark"
                                label="ផ្សេងៗ"

                            >
                                <Input.TextArea
                                    placeholder='ផ្សេងៗ'
                                    size='large'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Button style={{ width: "100%" }} type="primary" loading={loading} htmlType="submit" size='large'>
                                    កែប្រែ
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div >
    )
}
