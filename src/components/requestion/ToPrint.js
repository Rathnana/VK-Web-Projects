import React, { useState, useRef, useEffect } from 'react'
import { Typography, Row, Col } from 'antd';
import { Button } from 'antd';
import { GrPrint } from "react-icons/gr";
import ReactToPrint from "react-to-print";
import axios from 'axios'
import { Table } from 'antd';
import vklogo from '../../Image/vk-logo.png'

const { Title } = Typography;

export default function ToPrint({
    r_id,

    info
}) {
    const componentRef = useRef();
    const [data, setData] = useState()
    useEffect(() => {

        getRequestDescription(r_id)
    }, [data])
    const getRequestDescription = async (r_id) => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({ requestId: r_id }));

        return await axios.post(
            `${process.env.React_App_URL}/get/getRequestDescription.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {


                    setData(response?.data.data)
                    return response?.data;
                } else {
                    return [];
                }
            });
    }
    const columns = [
        {
            title: 'លរ',
            dataIndex: 'requestNumber',
            key: 'requestNumber',
            render: text => <a>{text}</a>,
        },
        {
            title: 'បរិយាយ',
            dataIndex: 'requestFor',
            key: 'requestFor',
        },
        {
            title: 'ឯកតា',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'បរិមាណ',
            dataIndex: 'qty',
            key: 'qty',
        }

    ];
    return (
        <div>

            <ReactToPrint
                trigger={() => <Button type="primary" shape="circle" icon={<GrPrint className='printIcon' style={{ marginTop: '5px' }} />} size='middle' />}
                content={() => componentRef.current}
                documentTitle='tes.pdf'
            />
            <div
                className='display'
            >

                <div

                    ref={componentRef}
                    style={{
                        paddingTop: "20px",
                        paddingRight: "60px",
                        paddingLeft: "60px",
                        fontSize: "15px",

                    }}
                >
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <img

                                style={{
                                    width: "200px",

                                    // marginBottom: "30px"
                                }}
                                src={vklogo} />

                        </Col>
                        <Col>
                            <Title
                                style={{
                                    fontFamily: 'Moul',
                                    color: '#1983e6',
                                    marginTop: "60px",
                                    fontWeight: 'normal',
                                    textAlign: "center"
                                }}
                                level={4}
                            >
                                {`ការស្នើរសុំសម្ភាៈ`}
                            </Title>
                        </Col>
                    </Row>

                    <Row
                        style={{
                            marginTop: "20px",
                            paddingTop: "8px"
                        }}
                    >
                        {/*  */}
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            ស្នើរទៅកាន់៖ {info.requestTo}
                        </Col>

                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            កាលបរិច្ឆេទស្នើរសុំ៖{info.date}
                        </Col>

                    </Row>

                    <Row
                        style={{

                            paddingTop: "8px"
                        }}
                    >
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            សម្រាប់ការដ្ឋាន៖{info.constructionName}
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            កាលបរិច្ឆេទត្រូវការ៖ {info.needDate}
                        </Col>

                    </Row>

                    <Row
                        style={{

                            paddingTop: "8px"
                        }}
                    >
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            គោលបំណង៖{info.purpose}
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                        </Col>

                    </Row>

                    <Row
                        style={{

                            paddingTop: "8px"
                        }}
                    >
                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            data remark
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                        </Col>

                    </Row>
                    <Row>
                        <Col style={{
                            marginTop: "20px",
                        }}
                            xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table size="small" pagination={false} columns={columns} dataSource={data} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ position: "relative", bottom: '0px' }} >
                            <p style={{
                                position: "fixed",
                                bottom: "0px",
                                left: "0px",
                                width: "100%",
                                textAlign: "center"
                            }} >
                                VK Angkor 2022
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>

    )
}
