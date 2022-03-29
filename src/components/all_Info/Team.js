import { Row, Col, Divider } from 'antd'
import React from 'react'
import {IoIosPeople} from 'react-icons/io'

export default function Team({ team }) {
    return (
        <Row>
            <Col
                xs={24} sm={24} md={24} lg={24} xl={24}
            >

                <Row
                    style={{
                        fontSize: "15px",
                        // marginTop: "-10px"
                        background: '#EEEEEE'
                    }}
                >
                    <Col xs={6} style={{ padding:"5px 0px 5px 5px", fontWeight: "bold", }}>
                    <IoIosPeople />&nbsp;&nbsp;ក្រុម {team?.teamNumber}
                    </Col>
                    <Col xs={8} style={{ padding:"5px 0px 5px 5px" }}>
                        <b>: {team?.teamLeaderName}</b>
                    </Col>
                    <Col xs={5} style={{ padding:"5px 0px 5px 5px" }}>
                        ជាង: <b>{team?.builderCount}</b>
                    </Col>
                    <Col xs={5} style={{ padding:"5px 0px 5px 5px" }}>
                        កម្មករ: <b>{team?.workerCount}</b>
                    </Col>
                </Row>
                <Row style={{ fontSize: "15px", marginTop: 5 }}>
                    <Col xs={6} style={{ padding:"5px 0px 5px 5px" }}>
                        &emsp;&nbsp;&nbsp;ការងារ
                    </Col>
                    <Col xs={18} style={{ padding:"5px 0px 5px 5px" }}>
                        : <b>{team?.performance}</b>
                    </Col>
                </Row>
                <Row style={{ fontSize: "15px" }}>
                    <Col xs={6} style={{ padding:"5px 0px 5px 5px" }}>
                    &nbsp;&nbsp;&nbsp;លទ្ទផល
                    </Col>
                    <Col xs={18} style={{ padding:"5px 0px 5px 5px", }}>
                        : <b>{team?.result}</b>
                    </Col>
                </Row>
                {/* <Divider style={{ marginTop: "10px" }} /> */}
            </Col>
        </Row>
    )
}
