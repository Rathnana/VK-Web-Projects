import { Col, Row, Space, DatePicker } from 'antd'
import React from 'react'
import { Typography } from 'antd';
import moment from 'moment';
import SectionA from './SectionA';
import SectionB from './SectionB';
const { Title } = Typography;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default function AllInfo() {
    return (
        <div
            style={{
                paddingLeft: "20px",
                paddingRight: "20px"
            }}
        >
            <Row>

                {/* Header ---------------------------------------------------- */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Title
                        style={{
                            fontFamily: 'Moul',
                            color: '#1983e6',
                            fontWeight: 'normal',
                        }}
                        level={4}
                    >
                        {`ព័ត៌មានសរុប`}
                    </Title>
                    <Row>
                        <Col>
                            <Title level={5}>
                                <Space size='middle'>
                                    កាលបរិច្ឆេទ:
                                    <DatePicker
                                        defaultValue={moment()}
                                        placeholder="កាលបរិច្ឆេទ"
                                        format={dateFormatList}
                                        onChange={(e) => console.log(e)}
                                    />
                                </Space>
                            </Title>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}
                >
                    <Row>
                        <SectionA />
                        <SectionB />
                    </Row>
                </Col>


            </Row>
        </div>

    )
}
