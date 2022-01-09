import React from 'react'
import { Card, Col, Row, Typography, Progress, Space } from 'antd';

export default function SectionA() {
    const [todos, setTodos] = React.useState([1, 2, 3, 4, 5, 6])
    return (
        <Col
            xs={12} sm={12} md={12} lg={12} xl={12}
        >
            <Row>
                {
                    todos.map(todo =>
                        <Col key={todo}
                            xs={12} sm={12} md={12} lg={8} xl={8}
                        >
                            <Card
                                // title="Card title"
                                bordered={false}
                                style={{
                                    background: "#f0f0f0", borderRadius: 10, marginTop: 20, marginRight: 10,
                                }}
                                cover={<img alt="example" src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80" />}
                            >
                                <Typography
                                    style={{ fontWeight: "bold", textAlign: "center" }}
                                >
                                    បងធារ៉ា
                                </Typography>
                                <Typography>បងធារ៉ា</Typography>
                                <Typography>បងធារ៉ា</Typography>
                                <Typography>បងធារ៉ា</Typography>
                                <Progress percent={30} size="small" />
                            </Card>
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}
