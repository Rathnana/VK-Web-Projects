import { Row, Col, Divider } from 'antd'
import React from 'react'


export default function Team({ team }) {
    return (
        <Row>
            <Col
                xs={24} sm={24} md={24} lg={24} xl={24}
                

            >

                <Row
                    style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        marginTop: "-10px"
                    }}
                >
                    <Col xs={12} style={{padding:5}}>
                        ក្រុមទី {team?.teamNumber} ៖ {team?.teamLeaderName}
                    </Col>
                    <Col xs={6} style={{padding:5}}>
                        ជាង៖ {team?.builderCount}
                    </Col>
                    <Col xs={6} style={{padding:5}}>
                        កម្មករ៖ {team?.workerCount}
                    </Col>
                    
                    <Col xs={24} style={{padding:5}}>
                        ការងារ៖ {team?.performance}
                    </Col>
                    <Col xs={24}
                        style={{
                            padding:5,
                            background: "#ffe394"
                        }}
                    >
                        លទ្ទផល៖ {team?.result}
                    </Col>
                </Row>
                <Divider style={{ marginTop: "10px" }} />
            </Col>
        </Row>
    )
}
