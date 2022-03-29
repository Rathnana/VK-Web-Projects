import { Card, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Progresss from './Progresss'
import TagBuilderMobile from './TagBuilderMobile'
import DefaultImage from '../../assets/img/default.jpg'

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
        } else if (totalBuilder >= 1) {
            setPaddingBottom(30)
        } else {
            setPaddingBottom(30)
        }

    }, [todo])

    return (
        <>
            <Card
                bordered={false}
                style={{
                    borderRadius: 50,

                }}
                className='card-report-mobile'
                cover={null}
                onClick={() => handleOpen(todo?.dc_id)}

            >
                <Row gutter={5}>
            
                    <Col xs={6} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <img
                            className='image-card-mobile'
                            alt="example"
                            onClick={() => handleOpen(todo?.dc_id)}
                            src={
                                todo?.resultImage === "" && todo?.startImage === "" ?
                                    DefaultImage
                                    : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                        : `${process.env.React_App_IMAGES}/${todo.startImage}`
                            } />
                    </Col>
                    <Col xs={13} style={{ position: 'relative', paddingBottom: paddingBottom }} >
                        
                        <span onClick={() => handleOpen(todo?.dc_id)}
                            style={{ fontWeight: "bold", fontFamily: 'Moul', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 }}
                        >
                            {todo.constructionName?.substring(0,10)}
                        </span>
                        <span style={{fontSize:14,fontWeight:'bold',paddingLeft:5}}>({parseInt(todo?.builderCount) + parseInt(todo.workerCount)}នាក់)</span>

                        <div style={{ fontWeight: "bold", fontSize: 11,letterSpacing:-0.3 }}>
                            ជាងៈ {parseInt(todo?.builderCount) - parseInt(todo?.painterCount)} | ថ្នាំៈ {todo?.painterCount} | ប្រុសៈ {parseInt(todo.workerCount) - parseInt(todo?.femaleWorkerCount)} | ស្រីៈ {todo?.femaleWorkerCount}
                        </div>

                        {todo.challenges !== '' ?
                            <Typography style={{ color: 'red', marginTop: 5, marginLeft: 0, fontSize: 11 }}>
                                បញ្ហាៈ {todo.challenges}
                            </Typography> : null}

                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 10 }}>
                            <Row>
                                {todo?.hasElectricianPlumber === '1' ?
                                    <Col xs={12} md={12} style={{ padding: 2 }}>
                                        <TagBuilderMobile title={`ជាងទឹកភ្លើង`} />
                                    </Col>
                                    : null}
                                {todo?.hasCeilBuilder === '1' ?
                                    <Col xs={12} md={12} style={{ padding: 2 }}>
                                        <TagBuilderMobile title={`ជាងពិដាន`} />
                                    </Col>
                                    : null}
                                {todo?.hasBlackSmith === '1' ?
                                    <Col xs={12} md={12} style={{ padding: 2 }}>
                                        <TagBuilderMobile title={`ជាងដែក`} />
                                    </Col>
                                    : null}
                                {todo?.hasAirConditionerMan === '1' ?
                                    <Col xs={12} md={12} style={{ padding: 2 }}>
                                        <TagBuilderMobile title={`ជាងម៉ាស៊ីនត្រជាក់`} />
                                    </Col>
                                    : null}
                                {todo?.hasMirrorBuilder === '1' ?
                                    <Col xs={12} md={12} style={{ padding: 2 }}>
                                        <TagBuilderMobile title={`ជាងកញ្ជក់`} />
                                    </Col>
                                    : null}
                            </Row>
                        </div>
                    </Col>

                    <Col xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Progresss type='circle' status={todo?.status} />
                    </Col>
                </Row>
            </Card>
        </>
    )
}
