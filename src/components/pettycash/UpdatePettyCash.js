import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Row, Col, Select, Drawer, InputNumber, message } from 'antd';
import { Button } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';
import { getCookie, Update_PettyCash } from '../../getDatabase';
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

    const [status, setStatus] = useState(null)

    const [totalCash, setTotalCash] = useState(0)
    const [totalCashKh, setTotalCashKh] = useState(0)

    const [dealedBy, setDealedBy] = useState('0')

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

        if (totalCash === 0 && totalCashKh === 0) {
            message.info("សូមបញ្ចូលទឹកប្រាក់!!")
            return;
        }

        setLoading(true)

        let newValue = {
            ...values,
            totalCash: totalCash,
            totalCashKh: totalCashKh,
            dealedBy: status ==='បានទូរទាត់' ? parseInt(dealedBy)>0 ? dealedBy : getCookie("u_id") : 0,
            paidDate: moment(values?.paidDate).format('YYYY-MM-DD HH:mm:ss')
        }

        let updateState = await Update_PettyCash(newValue, pc_id);
        if (updateState) {
            setVisible(false);
            setSuccess(true)
            setLoading(false)
        } else {
            setLoading(false)
        }

    };
    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                type: pettyCash?.type,
                date: moment(pettyCash?.date),
                borrowPerson: pettyCash?.borrowPerson,
                remark: pettyCash?.remark,
                totalCash: pettyCash?.totalCash,
                totalCashKh: pettyCash?.totalCashKh,
                status: pettyCash?.status,
                paidDate: pettyCash?.paidDate !== '0000-00-00 00:00:00' ? moment(pettyCash?.paidDate) : null,
            })

            setDealedBy(pettyCash?.dealedBy)
            setStatus(pettyCash?.status)
            setTotalCash(parseFloat(pettyCash?.totalCash))
            setTotalCashKh(parseFloat(pettyCash?.totalCashKh))
        }

    }, [visible])

    const handleInputUSD = (e) => {
        // let khr = convertUSDtoKHR(e)
        setTotalCash(parseFloat(e))
        setTotalCashKh(0)
        // form.setFieldsValue({
        //     totalCashKh: khr
        // })
    }

    const handleInputKH = (e) => {
        setTotalCashKh(parseFloat(e))
        setTotalCash(0)
        // let usd = convertKHRtoUSD(e)
        // form.setFieldsValue({
        //     totalCash: usd
        // })

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
                                label={<span>ចំនួនប្រាក់ (&#6107;)</span>}
                            // rules={[{ required: totalCashKh>0, message: totalCashKh >0 && "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="KHR"
                                    style={{ width: '100%' }}
                                    disabled={totalCash > 0}
                                    onKeyUp={(e) => handleInputKH(e.target.value)}
                                    onStep={(e) => handleInputKH(e)}
                                    step={100}
                                    min={0}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="totalCash"
                                label={<span>ចំនួនប្រាក់ ($)</span>}
                            // rules={[{ required: totalCash>0, message: totalCash > 0 && "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="USD"
                                    disabled={totalCashKh > 0}
                                    style={{ width: '100%' }}
                                    onKeyUp={(e) => handleInputUSD(e.target.value)}
                                    onStep={(e) => handleInputUSD(e)}
                                    size="large"
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="type"
                                label="ប្រភេទ"
                                rules={[{ required: true, message: "សូមជ្រើសរើសប្រភេទ!!" }]}
                            >
                                <Select placeholder='ប្រភេទ' size='large' allowClear>
                                    <Option value={'ខ្ចី'}>ខ្ចី</Option>
                                    <Option value={'Petty Cash'}>Petty Cash</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="status"
                                label="ស្ថានភាព"
                                rules={[{ required: true, message: "សូមជ្រើសរើសស្ថានភាព!!" }]}
                            >
                                <Select
                                    // defaultValue={pettyCash.}
                                    // style={{ width: "100%" }}
                                    onChange={(e) => setStatus(e)}
                                    placeholder="ស្ថានភាព"
                                    size='large'
                                >
                                    <Option value="បានទូរទាត់">បានទូរទាត់</Option>
                                    <Option value="មិនទាន់ទូរទាត់">មិនទាន់ទូរទាត់</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {
                            status === 'បានទូរទាត់' ?
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                    <Form.Item
                                        name="paidDate"
                                        label="កាលបរិច្ឆេទទូរទាត់"
                                        rules={[{ required: true, message: "សូមជ្រើសរើសកាលបរិច្ឆេទទូរទាត់!!" }]}
                                    >
                                        <DatePicker
                                            placeholder="កាលបរិច្ឆេទទូរទាត់"
                                            size="large"
                                            style={{ width: '100%' }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                : null}
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
