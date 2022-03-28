import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Typography, Skeleton, Empty } from 'antd';
import axios from 'axios'
import Progress from './Progresss';
import moment from 'moment';
import CardDailyConstruct from './CardDailyConstruct';
import ModalDetail from './ModalDetail';
import CardDailyConstructMobile from './CardDailyConstructMobile';
import SkeletonCard from './SkeletonCard';
import { useRequest } from 'ahooks';
import { getConstructByDate } from '../../getDatabase';


export default function SectionA({ date }) {
    // const [todos, setTodos] = useState()
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(3);
    // const [loading, setLoading] = useState(true);

    const [stateRun, setStateRun ] = useState(0)

    const [openDetail,setOpenDetail] = useState(false)
    const [dailyConstructId,setDailyConstructId] = useState(null)

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

    const { data:todos, loading,run} = useRequest(getConstructByDate, {
        pollingInterval:10000,
        pollingWhenHidden: false,
        defaultParams: [date],
        onSuccess:(data)=>{
            setStateRun(stateRun+1)
        }
    });

    useEffect(() => {
        setStateRun(0)
        run(date)
    }, [date])

    if (loading && stateRun===0) return (
    <Col
        xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}}
    >
        <SkeletonCard loading={loading} />
    </Col >
    )

    if (todos?.data?.length <= 0) {
        return (
            <Col  xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}} style={{ height: '70vh', border: '2px solid #DDDDDD', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
            </Col>
        )
    }

    return (
        <Col
            xs={{span:24,order:1}} sm={{span:24,order:1}} md={{span:24,order:1}} lg={{span:24,order:1}} xl={{span:16,order:0}} xxl={{span:16,order:0}}
        >
            <ModalDetail id={dailyConstructId} open={openDetail} setOpen={setOpenDetail} />
            <Row>
                {
                    todos?.data?.map(todo =>
                        <Col key={todo.dc_id}
                            xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} style={{ padding: 5 }}
                        >
                            {
                                isMobile ? 
                                <CardDailyConstructMobile key={todo?.dc_id} todo={todo} setDailyConstructId={setDailyConstructId} setOpenDetail={setOpenDetail} />
                                :
                                <CardDailyConstruct key={todo?.dc_id} todo={todo} setDailyConstructId={setDailyConstructId} setOpenDetail={setOpenDetail} />

                            }
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}
