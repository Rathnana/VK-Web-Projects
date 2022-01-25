import React, { useState, useRef, useEffect } from 'react'
import {  Typography, Row, Col } from 'antd';
import { Button } from 'antd';
import { GrPrint } from "react-icons/gr";
import ReactToPrint from "react-to-print";
import axios from 'axios'
import { Table } from 'antd';
const { Title } = Typography;

export default function ToPrint({
    r_id,
    date,
    startDate,
    requestTo,
    purpose,
    constructionName
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
                        padding: "60px",
                        fontSize: "15px",

                    }}
                >
                    <Title
                        style={{
                            fontFamily: 'Moul',
                            color: '#1983e6',
                            fontWeight: 'normal',
                            textAlign: "center"
                        }}
                        level={4}
                    >
                        {`តារាងទិន្នន័យអតិថិជន`}
                    </Title>

                    <Row
                        style={{
                            marginTop: "20px",
                            paddingTop: "8px"
                        }}
                    >

                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            កាលបរិច្ឆេទស្នើរសុំ៖ {date}
                        </Col>

                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            កាលបរិច្ឆេទត្រូវការ៖{startDate}
                        </Col>

                    </Row>

                    <Row
                        style={{

                            paddingTop: "8px"
                        }}
                    >
                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                            ស្នើរទៅកាន់៖{requestTo}
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>

                        </Col>

                    </Row>

                    <Row
                        style={{

                            paddingTop: "8px"
                        }}
                    >
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            សម្រាប់ការដ្ឋាន៖{constructionName}
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
                            គោលបំណង៖{purpose}
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                        </Col>

                    </Row>
                    <Row>
                        <Col style={{
                            marginTop: "20px",
                        }}
                            xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Table pagination={false}  columns={columns} dataSource={data} />
                        </Col>
                    </Row>
                </div>
            </div>
           
        </div>

    )
}
