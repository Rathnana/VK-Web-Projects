import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Popconfirm, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { delete_cookie, getCookie } from '../../getDatabase';

const { Search } = Input;

export default function Header({ setAuth, setSearch,search }) {

    const { pathname } = useLocation()
    const [isSearch, setIsSearch] = useState(true)

    useEffect(() => {
        setSearch(null)
        if (pathname !== '/' && pathname !== '/report') {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
    }, [pathname])

    return (
        <div>
            <Row
                style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
            >
                <Col xs={{span:24,order:1}} sm={{span:14,order:0}} md={{span:9,order:0}} lg={{span:8,order:0}} xl={{span:6,order:0}} style={{paddingTop:10}} >
                    {
                        isSearch ? (
                            <Search
                                allowClear
                                value={search}
                                enterButton="ស្វែងរក"
                                size="large"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        ) : null
                    }

                </Col>
                <Col xs={{span:24,order:0}} sm={{span:8,offset:2,order:1}} md={{ span: 6,offset:9,order:1}} lg={{ span: 5,offset:11,order:1 }} xl={{ span: 4, offset: 14,order:1 }}>
                    <center>
                        <p
                            style={{
                                marginTop: 10,
                                // position: "absolute",
                                right: 0,
                                cursor: "pointer",
                                fontSize: 18
                            }}
                        >
                            <Popconfirm
                                placement="topRight"
                                title={"តើអ្នកចង់ចាកចេញ?"}
                                onConfirm={() => {
                                    delete_cookie("u_id");
                                    delete_cookie("username");
                                    message.success("ជោគជ័យ!!")
                                    setAuth(true)
                                }}
                                okText="Yes"
                                cancelText="No"

                            >
                                <span style={{ color: "red" }}>ចាកចេញ</span>
                            </Popconfirm>
                            <span style={{}}>{` | ${getCookie("username").toUpperCase()}`}</span>
                        </p>
                    </center>
                </Col>
            </Row>
        </div>
    )
}
