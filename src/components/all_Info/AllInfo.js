import { Col, Row, Space, DatePicker } from 'antd'
import React, { useState } from 'react'
import { Typography } from 'antd';
import moment from 'moment';
import SectionA from './SectionA';
import SectionB from './SectionB';
import WorkerGraph from './WorkerGraph';
// import faker from 'faker';
// import WorkerGraph from './WorkerGraph';
const { Title } = Typography;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default function AllInfo() {

    const [date, setDate] = useState()

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
                                        size='large'
                                        allowClear={false}
                                        format={dateFormatList}
                                        onChange={(e) => setDate(e)}
                                    />
                                </Space>
                            </Title>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                    <Row>
                        <SectionA date={date} />
                        <SectionB />
                    </Row>

                </Col>
            </Row>
        </div>

    )
}

{/* <SectionA date={date} />

<WorkerGraph /> */}