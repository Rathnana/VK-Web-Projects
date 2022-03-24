import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Skeleton, Empty } from 'antd';
import axios from 'axios'
import Progress from './Progresss';
import moment from 'moment';
import CardDailyConstruct from './CardDailyConstruct';
import ModalDetail from './ModalDetail';
import CardDailyConstructMobile from './CardDailyConstructMobile';

export default function SectionA({ date }) {
    const [todos, setTodos] = useState()
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(3);
    const [loading, setLoading] = useState(true);

    const [openDetail,setOpenDetail] = useState(false)
    const [dailyConstructId,setDailyConstructId] = useState(null)

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 992) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)


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
        xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}}
    >
        <Row>

            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
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
            <Col  xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}} style={{ height: '70vh', border: '2px solid #DDDDDD', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
            </Col>
        )
    }

    return (
        <Col
            xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}}
        >
            <ModalDetail id={dailyConstructId} open={openDetail} setOpen={setOpenDetail} />
            <Row>
                {
                    todos?.map(todo =>
                        <Col key={todo.dc_id}
                            xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
                        >
                            {
                                isMobile ? 
                                <CardDailyConstructMobile key={todo?.dc_id} todo={todo} setDailyConstructId={setDailyConstructId} setOpenDetail={setOpenDetail} />
                                :
                                <CardDailyConstruct key={todo?.dc_id} todo={todo} setDailyConstructId={setDailyConstructId} setOpenDetail={setOpenDetail} />

                            }
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}
