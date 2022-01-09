import React from 'react'
import { Row, Col, Input } from 'antd';
const { Search } = Input;
export default function Header() {
    return (
        <div>
            <Row
                style={{ marginTop: 30, padding: "20px" }}
            >
                <Col xs={14} sm={14} md={9} lg={8} xl={6} >
                    <Search
                        // placeholder="input search text"

                        allowClear
                        enterButton="ស្វែងរក"
                        size="large"
                    // onSearch={onSearch}
                    />
                </Col>
                <Col xs={10} sm={10} md={15} lg={16} xl={18}
                // style={{
                //     position: "relative"
                // }}
                >
                    <p
                        style={{
                            marginTop: 10,
                            position: "absolute",
                            right: 0
                        }}
                    >
                        ចាកចេញ | សួស្ដី ធីរដ្ឋា
                    </p>
                </Col>
            </Row>
        </div>
    )
}
