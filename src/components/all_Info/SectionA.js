import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Skeleton, Empty } from 'antd';
import axios from 'axios'
import Progress from './Progresss';
import moment from 'moment';
import CardDailyConstruct from './CardDailyConstruct';
import ModalDetail from './ModalDetail';

export default function SectionA({ date }) {
    const [todos, setTodos] = useState()
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(3);
    const [loading, setLoading] = useState(true);

    const [openDetail,setOpenDetail] = useState(false)
    const [dailyConstructId,setDailyConstructId] = useState(null)


    useEffect(() => {
        setLoading(true)
        getConstructByDate();
    }, [date])

    const getConstructByDate = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        params.append('data', JSON.stringify({ date: moment(date).format('YYYY-MM-DD') }))

        return await axios.post(
            `${process.env.React_App_URL}/get/getDailyConstructByDate.php`, params
        )
            .then(async function (response) {
                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setTodos(response?.data.data)
                    setLoading(false)
                    return response?.data;
                } else {
                    setLoading(false)
                    return [];
                }
            });
    }

    if (loading) return (<Col
        xs={16} sm={16} md={16} lg={16} xl={16}
    >
        <Row>

            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
        </Row >
    </Col >
    )

    if (todos?.length <= 0) {
        return (
            <Col xs={16} sm={16} md={16} lg={16} xl={16} style={{ height: '70vh', border: '2px solid #DDDDDD', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
            </Col>
        )
    }

    return (
        <Col
            xs={16} sm={16} md={16} lg={16} xl={16}
        >
            <ModalDetail id={dailyConstructId} open={openDetail} setOpen={setOpenDetail} />
            <Row>
                {
                    todos?.map(todo =>
                        <Col key={todo.dc_id}
                            xs={24} sm={24} md={24} lg={12} xl={8} xxl={6} style={{ padding: 10 }}
                        >
                            <CardDailyConstruct key={todo?.dc_id} todo={todo} setDailyConstructId={setDailyConstructId} setOpenDetail={setOpenDetail} />
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}
