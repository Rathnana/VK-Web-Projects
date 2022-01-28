import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Row, Col, Select, Drawer } from 'antd';
import { Button } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";
import moment from 'moment';
import { Update_PettyCash } from '../../getDatabase';

const { Option } = Select;
export default function UpdatePettyCash({
    setSuccess,
    pc_id,
    pettyCash
}) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const onFinish = values => {
        setVisible(false);
        Update_PettyCash(values, pc_id);
        setSuccess(true)

    };
    useEffect(() => {
        form.setFieldsValue({
            date: moment(pettyCash?.date),
            borrowPerson: pettyCash?.borrowPerson,
            remark: pettyCash?.remark,
            totalCash: pettyCash?.totalCash,
            status: pettyCash?.status
        })
    }, [])

    return (
        <div>
            <Button onClick={showDrawer} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />
            <Drawer width={520} title="Edit Petty Cash" placement="right" onClose={onClose} visible={visible}>

                <Form
                    form={form}
                    id='edit-petty-cash-form' layout="vertical" onFinish={onFinish}
                >
                    <Row gutter={10}>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
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
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
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
                    <Row gutter={10}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
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
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                            <Form.Item
                                name="totalCash"
                                label="ចំនួនទឹកប្រាក់"
                                rules={[{ required: true, message: "សូមបំពេញចំនួនទឹកប្រាក់!!" }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="ចំនួនទឹកប្រាក់"
                                    size="large"
                                />


                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="remark"
                                label="ផ្សេងៗ"

                            >
                                <Input
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
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" size='large'>
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
