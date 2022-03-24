import { Col, Row, Skeleton } from 'antd'
import React, { useState, useEffect } from 'react'

export default function SkeletonCard({ loading }) {

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 575) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)

    const SkeletonComp = () => (
        <Col
            xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
        >
            <center style={{ width: "100%", padding: 10 }} >
                <Skeleton.Image width="100%" />
                <Skeleton active={loading} />
            </center>
        </Col>
    )

    const SkeletonCompMobile = () => (
        <Col
            xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
        >
            <Row>
                <Col xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Skeleton.Image style={{borderRadius:50,padding:20,width:70,height:70}} /></Col>
                <Col xs={13}>
                    {/* <Skeleton.Button size='default' active={loading} /><br/> */}
                    <Skeleton size='small' active={loading} />
                    
                </Col>
                {/* <Col xs={5}><Skeleton /></Col> */}
            </Row>
        </Col>
    )

    return (
        <Row>

            {
                isMobile ?
                    <>
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />
                        <SkeletonCompMobile />

                    </>
                    :
                    <>
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />
                        <SkeletonComp />

                    </>
            }

            {/* <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col>
            <Col
                xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
            >
                <center style={{ width: "100%", padding: 10 }} >
                    <Skeleton.Image width="100%" />
                    <Skeleton active={loading} />
                </center>
            </Col> */}
        </Row >
    )
}
