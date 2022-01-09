import React, { useState, useEffect } from 'react'
import { Modal, Select, Input, message, DatePicker, Row, Col, Space } from 'antd';
import { Button } from 'antd';
import axios from 'axios'
// import { AiOutlineEdit } from "react-icons/ai";
import { Create_Request } from '../../getDatabase'
// import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input;
export default function CreateRequest() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [construction, setConstruction] = useState()
    const [request, setRequest] = useState({
        requestFor: '',
        constructionId: '',
        date: '',
        needDate: '',
        r_status: '',

    })
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        // .format('YYYY-MM-DD')
        setIsModalVisible(false);
        // Create_Request console.log
        Create_Request(request.requestFor, request.constructionId, request.date.format('YYYY-MM-DD'), request.needDate.format('YYYY-MM-DD'), request.r_status)
        message.success('ស្នើសុំជោជ័យ!');
        setRequest({
            requestFor: '',
            constructionId: '',
            date: '',
            needDate: '',
            r_status: '',
        })
        setTimeout(() => window.location.reload(), 300);

    };

    useEffect(() => {
        getConstruction();
    }, [])
    const getConstruction = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getConstruction.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    // console.log(response?.data.data)
                    setConstruction(response?.data.data)
                    return response?.data;
                } else {
                    // openErrorNotification({ title: 'Failed', message: response.data })
                    console.log(response.data)
                    return [];
                }
            });
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function handleChange(value) {
        setRequest({ ...request, constructionId: value })
    }
    return (
        <div>

            <Button onClick={showModal} type="primary">+ បន្ថែមថ្មី</Button>
            <Modal
                title="ការស្នើរសុំ"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="បង្កើត"
            >
                <p>បរិយាយ</p>
                <TextArea
                    defaultValue={request.requestFor}
                    rows={4}
                    onChange={(e) => setRequest({ ...request, requestFor: e.target.value })}
                />
                <br />
                < br />
                <Row>
                    <Space size="large">
                        <Col>
                            <p>ថ្ងៃស្នើរសុំ</p>
                            <DatePicker
                                defaultValue={request.date}
                                style={{ width: '220px' }}
                                onChange={e => setRequest({ ...request, date: e })}
                            />
                        </Col>
                        <Col>
                            <p>ថ្ងៃត្រូវការ</p>
                            <DatePicker
                                defaultValue={request.needDate}
                                style={{ width: '220px' }}
                                onChange={e => setRequest({ ...request, needDate: e })}
                            />
                        </Col>
                    </Space>
                </Row>
                <br />
                < br />
                <p>ជ្រើសរើសការដ្ឋាន</p>
                <Select
                    defaultValue={request.constructionId}
                    size="large"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    {
                        construction?.map(con=> <Option value={con.c_id}>{con.constructionName}</Option>)
                    }
                   
                   
                </Select>
                <br />
                < br />
                <p>ស្ថានភាព</p>
                <Select
                    defaultValue={request.r_status}
                    size="large"
                    onChange={(value) => setRequest({ ...request, r_status: value })}
                    style={{ width: '100%' }}
                >
                    <Option value="បន្ទាន់">បន្ទាន់</Option>
                    <Option value="មិនទាន់ទទួល">មិនទាន់ទទួល</Option>
                    <Option value="ទទួលបាន">ទទួលបាន</Option>
                </Select>
            </Modal>
        </div >
    )
}
