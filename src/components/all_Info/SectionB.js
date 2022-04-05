import React,{useState,useEffect} from 'react'
import { Col } from 'antd';
import WorkerGraph from './WorkerGraph';
import Weather from './Weather';


export default function SectionB() {

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 992) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)
    return (
        <Col
            xs={{span:24,order:0}} sm={{span:24,order:0}} md={{span:24,order:0}} lg={{span:24,order:0}} xl={{span:8,order:1}} xxl={{span:8,order:1}}
            // className="site-card-wrapper"
            style={{ padding: '0px 20px' }}
        >
           {!isMobile && <><Weather /></>}
           {!isMobile && <><br/><WorkerGraph /></>}
            {/* <PageHeader
                ghost={false}
                title="តារាងស្នើរសុំសម្ភារៈ"
                style={{ background: "#f0f0f0", marginTop: 20 }}
                extra={[
                    <Button key="s" onClick={() => navigate('/requesting')} type="text">View All</Button>
                ]}
            >
            </PageHeader> */}
            {/* <RequestTabel /> */}
        </Col>
    )
}
