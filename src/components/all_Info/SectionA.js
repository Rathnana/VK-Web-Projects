import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Space, Skeleton } from 'antd';
import axios from 'axios'
import Progress from './Progresss';

export default function SectionA() {
    const [todos, setTodos] = React.useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setLoading(true)
        getConstructByDate();
    }, [])

    const getConstructByDate = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)

        return await axios.post(
            `${process.env.React_App_URL}/get/getDailyConstructByDate.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setTodos(response?.data.data)
                    // console.log(response?.data.data);
                    setLoading(false)
                    return response?.data;
                } else {

                    return [];
                }
            });
    }

    if (loading || todos?.length <= 0) return (<Col
        xs={24} sm={24} md={12} lg={12} xl={12}
    >
        <Row>
            <Col
                xs={24} sm={24} md={12} lg={8} xl={8}
            >
                <center style={{ width: "100%",padding:10 }} >
                    <Skeleton.Image width= "100%"  />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={12} lg={8} xl={8}
            >
                <center style={{ width: "100%",padding:10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={24} md={12} lg={8} xl={8}
            >
                <center style={{ width: "100%",padding:10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
        </Row >
    </Col >
    )
    return (
        <Col
            xs={24} sm={24} md={12} lg={12} xl={12}
        >
            <Row>
                {
                    todos?.map(todo =>
                        <Col key={todo.dc_id}
                            xs={12} sm={12} md={12} lg={12} xl={8} style={{padding:10}}
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
                                        `${todo.constructionName} (${todo.constructionLocation})`
                                    }
                                </Typography><br/>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {`${todo.chiefName} (${todo.teamCount}ក្រុម)`}
                                </Typography>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {`ចំ.ជាង៖ ${todo.builderCount} | ចំ.កម្មករ៖ ${todo.workerCount}`}
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
