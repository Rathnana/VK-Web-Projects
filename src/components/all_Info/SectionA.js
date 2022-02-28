import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Space, Skeleton, Empty } from 'antd';
import axios from 'axios'
import Progress from './Progresss';
import moment from 'moment';

export default function SectionA({ date }) {
    const [todos, setTodos] = useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        getConstructByDate();
    }, [date])

    const getConstructByDate = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({ date: moment(date).format('YYYY-MM-DD') }))

        return await axios.post(
            `${process.env.React_App_URL}/get/getDailyConstructByDate.php`, params
        )
            .then(async function (response) {
                console.log(response?.data);
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
        xs={24} sm={24} md={12} lg={12} xl={12}
    >
        <Row>

            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}
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
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ height: '70vh', border: '2px solid #DDDDDD', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
            </Col>
        )
    }

    return (
        <Col
            xs={24} sm={24} md={12} lg={12} xl={12}
        >
            <Row>
                {
                    todos?.map(todo =>
                        <Col key={todo.dc_id}
                            xs={24} sm={24} md={24} lg={12} xl={12} xxl={8} style={{ padding: 10 }}
                        >
                            <Card
                                bordered={false}
                                style={{
                                    background: "#f0f0f0", borderRadius: 5,
                                }}
                                className='card-report'
                                cover={
                                    <img
                                        className='image-card'
                                        alt="example"
                                        src={
                                            todo?.resultImage === "" && todo?.startImage === "" ?
                                                "https://www.chanchao.com.tw/ctg/images/default.jpg"
                                                : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                                    : `${process.env.React_App_IMAGES}/${todo.startImage}`

                                        } />}
                            >
                             
                                <Typography
                                    style={{ fontWeight: "bold", textAlign: "center" }}
                                >
                                    {
                                        `${todo.constructionName}`
                                    }<br />
                                    {/* {
                                        `(${todo.constructionLocation})`
                                    } */}
                                </Typography><br />
                                <Typography style={{ fontWeight: "bold" }}>
                                    {`${todo.chiefName} (${todo.teamCount} ក្រុម)`}
                                </Typography>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {`ជាង៖ ${todo.builderCount} | ក.ប្រុស៖ ${parseInt(todo.workerCount)-parseInt(todo.femaleWorkerCount)} | ក.ស្រី៖ ${todo.femaleWorkerCount}`}
                                </Typography>
                                {
                                    todo.performances?.map((per) => <Typography >- {per.performance}</Typography>)
                                }


                                <Typography style={{ color: 'red' }}>{todo.challenges}</Typography>
                                <Progress status={todo?.status} />
                            </Card>
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}
