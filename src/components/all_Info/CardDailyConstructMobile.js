import { Card, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Progresss from './Progresss'
import TagBuilder from './TagBuilder'

export default function CardDailyConstructMobile({ todo, setOpenDetail, setDailyConstructId }) {
    const [paddingBottom, setPaddingBottom] = useState(130)

    const handleOpen = (e) => {
        setDailyConstructId(e)
        setOpenDetail(true)
    }

    useEffect(() => {

        let totalBuilder = parseInt(todo?.hasElectricianPlumber) + parseInt(todo?.hasAirConditionerMan) + parseInt(todo?.hasBlackSmith) + parseInt(todo?.hasCeilBuilder) + parseInt(todo?.hasMirrorBuilder)
        if (totalBuilder >= 6) {
            setPaddingBottom(130)
        } else if (totalBuilder >= 3) {
            setPaddingBottom(95)
        }else if (totalBuilder >= 1) {
            setPaddingBottom(60)
        } else {
            setPaddingBottom(30)
        }

    }, [todo])

    return (
        <>
            <Card
                bordered={false}
                style={{
                    borderRadius: 5, position: 'relative', paddingBottom: paddingBottom
                }}
                className='card-report'
                cover={null}
            >
                <Row>
                    <Col xs={24} style={{ padding: 3 }}>
                        <span onClick={() => handleOpen(todo?.dc_id)}>
                            <Typography
                                style={{ fontWeight: "bold", fontFamily: 'Moul', cursor: 'pointer', textDecoration: 'underline' }}

                            >
                                {
                                    `${todo.constructionName}`
                                }

                            </Typography>
                        </span>
                    </Col>
                    <Col xs={7} style={{ padding: 3 }}>
                        <img
                            className='image-card-mobile'
                            alt="example"
                            onClick={() => handleOpen(todo?.dc_id)}
                            src={
                                todo?.resultImage === "" && todo?.startImage === "" ?
                                    "https://www.chanchao.com.tw/ctg/images/default.jpg"
                                    : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                        : `${process.env.React_App_IMAGES}/${todo.startImage}`
                            } />
                    </Col>
                    <Col xs={17} style={{ padding: 3 }}>
                        <Typography style={{ fontWeight: "bold" }}>
                            {/* {`${todo.chiefName} (${todo.teamCount} ក្រុម)`} */}
                            មេកា៖ {`${todo?.chiefName}`} ({todo.teamCount} ក្រុម - {parseInt(todo?.builderCount) + parseInt(todo.workerCount)} នាក់)
                        </Typography>
                        <Typography style={{ fontWeight: "bold" }}>
                            {/* {`ជាង៖ ${todo.builderCount} | ក.ប្រុស៖ ${parseInt(todo.workerCount) - parseInt(todo.femaleWorkerCount)} | ក.ស្រី៖ ${todo.femaleWorkerCount}`} */}
                            ជាងៈ {parseInt(todo?.builderCount) - parseInt(todo?.painterCount)} | ជាងថ្នាំៈ {todo?.painterCount} | ប្រុសៈ {parseInt(todo.workerCount) - parseInt(todo?.femaleWorkerCount)} | ស្រីៈ {todo?.femaleWorkerCount}
                        </Typography>


                        <div style={{ paddingTop: 10 }}>
                            {
                                todo.performances?.map((per) => <Typography >- {per.performance}</Typography>)
                            }
                        </div>
                    </Col>
                </Row>



                <Typography style={{ color: 'red', marginTop:10,marginLeft:5 }}>{todo.challenges}</Typography>

                <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                    <Row>
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
                    <Progresss status={todo?.status} />
                </div>
            </Card>
        </>
    )
}
