import { Card, Col, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { getTotalBuilder, getTotalWorker } from '../../own-comp'
import ModalDetail from './ModalDetail'
import Progresss from './Progresss'
import TagBuilder from './TagBuilder'

export default function CardDailyConstruct({ todo, setOpenDetail, setDailyConstructId }) {

    const handleOpen = (e) => {
        setDailyConstructId(e)
        setOpenDetail(true)
    }

    return (
        <>
            <Card
                bordered={false}
                style={{
                     borderRadius: 5, position: 'relative', paddingBottom: 30
                }}
                // background: "#f0f0f0",
                className='card-report'
                cover={
                    <img
                        className='image-card'
                        alt="example"
                        onClick={() => handleOpen(todo?.dc_id)}
                        src={
                            todo?.resultImage === "" && todo?.startImage === "" ?
                                "https://www.chanchao.com.tw/ctg/images/default.jpg"
                                : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                    : `${process.env.React_App_IMAGES}/${todo.startImage}`

                        } />}
            >

                <span onClick={() => handleOpen(todo?.dc_id)}>
                    <Typography
                        style={{ fontWeight: "bold", textAlign: "center", cursor: 'pointer', textDecoration: 'underline' }}

                    >
                        {
                            `${todo.constructionName}`
                        }

                    </Typography></span><br />
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`${todo.chiefName} (${todo.teamCount} ក្រុម)`} */}
                    មេកា៖ {`${todo?.chiefName}`} ({todo.teamCount} ក្រុម - {parseInt(todo?.builderCount) + parseInt(todo.workerCount)} នាក់)
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`ជាង៖ ${todo.builderCount} | ក.ប្រុស៖ ${parseInt(todo.workerCount) - parseInt(todo.femaleWorkerCount)} | ក.ស្រី៖ ${todo.femaleWorkerCount}`} */}
                    ជាងៈ {parseInt(todo?.builderCount) - parseInt(todo?.painterCount)} | ជាងថ្នាំៈ {todo?.painterCount} | ប្រុសៈ {parseInt(todo.workerCount) - parseInt(todo?.femaleWorkerCount)} | ស្រីៈ {todo?.femaleWorkerCount}
                </Typography>


                <div style={{ padding: 15 }}>
                    {
                        todo.performances?.map((per) => <Typography >- {per.performance}</Typography>)
                    }
                </div>


                <Row >
                    {todo?.hasElectricianPlumber === '1' ?
                        <Col xs={12} md={12} style={{ padding: 5 }}>
                            <TagBuilder title={`ជាងទឹកភ្លើង`} />
                        </Col>
                        : null}
                    {todo?.hasCeilBuilder === '1' ?
                        <Col xs={12} md={12} style={{ padding: 5 }}>
                            <TagBuilder title={`ជាងពិដាន`} />
                        </Col>
                        : null}
                    {todo?.hasBlackSmith === '1' ?
                        <Col xs={12} md={12} style={{ padding: 5 }}>
                            <TagBuilder title={`ជាងដែក`} />
                        </Col>
                        : null}
                    {todo?.hasAirConditionerMan === '1' ?
                        <Col xs={12} md={12} style={{ padding: 5 }}>
                            <TagBuilder title={`ជាងម៉ាស៊ីនត្រជាក់`} />
                        </Col>
                        : null}
                    {todo?.hasMirrorBuilder === '1' ?
                        <Col xs={12} md={12} style={{ padding: 5 }}>
                            <TagBuilder title={`ជាងកញ្ជក់`} />
                        </Col>
                        : null}
                </Row>


                <Typography style={{ color: 'red' }}>{todo.challenges}</Typography>

                <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                    <Progresss status={todo?.status} />
                </div>
            </Card>
        </>
    )
}
