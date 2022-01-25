import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
const { Search } = Input;

export default function Header({ setAuth }) {

 



    return (
        <div>
            <Row
                style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
            >
                <Col xs={14} sm={14} md={9} lg={8} xl={6} >
                    <Search
                        allowClear
                        enterButton="ស្វែងរក"
                        size="large"
                    />
                </Col>
                <Col xs={10} sm={10} md={15} lg={16} xl={18} >
                    <p
                        style={{
                            marginTop: 10,
                            position: "absolute",
                            right: 0,
                            cursor: "pointer"
                        }}
                    >
                        <Popconfirm
                            placement="topRight"
                            title={"តើអ្នកចង់ចាកចេញ?"}
                            onConfirm={() => {
                                sessionStorage.removeItem("u_id");
                                message.success("ជោគជ័យ!!")
                                setAuth(true)
                            }}
                            okText="Yes"
                            cancelText="No"

                        >
                            <span style={{ color: "red" }}>ចាកចេញ</span>
                        </Popconfirm>
                        {` | ${sessionStorage.getItem("username")}`}
                    </p>
                </Col>
            </Row>
        </div>
    )
}
