import { Card, Col, Row, Typography } from 'antd'
import React, { useEffect,useState } from 'react'
import { checkStatus } from '../../own-comp'
import Progresss from './Progresss'
import TagBuilder from './TagBuilder'

export default function CardDailyConstruct({ todo, setOpenDetail, setDailyConstructId }) {
    const [paddingBottom,setPaddingBottom] = useState(130)

    const handleOpen = (e) => {
        setDailyConstructId(e)
        setOpenDetail(true)
    }

    useEffect(()=>{

        let totalBuilder = parseInt(todo?.hasElectricianPlumber)+parseInt(todo?.hasAirConditionerMan)+parseInt(todo?.hasBlackSmith)+parseInt(todo?.hasCeilBuilder)+parseInt(todo?.hasMirrorBuilder)+parseInt(todo?.hasCarpenter)
        if(totalBuilder>=6){
            setPaddingBottom(130)
        }else if(totalBuilder>=3){
            setPaddingBottom(95)
        }else if(totalBuilder>=1){
            setPaddingBottom(60)
        }else{
            setPaddingBottom(30)
        }

    },[todo])

    return (
        <>
            <Card
                bordered={false}
                style={{
                    borderRadius: 10, position: 'relative', paddingBottom: paddingBottom
                }}
                className={`card-report ${checkStatus(todo?.status) === 100 ? 'success-bg':''}`}
                cover={
                    <img
                        className='image-card'
                        alt="example"
                        onClick={() => handleOpen(todo?.dc_id)}
                        src={
                            todo?.resultImage === "" && todo?.startImage === "" ?
                                "https://www.chanchao.com.tw/ctg/images/default.jpg"
                                // todo?.latestResultImage !=='' ? `${process.env.React_App_IMAGES}/${todo?.latestResultImage}` : `${process.env.React_App_IMAGES}/${todo?.latestStartImage}`
                                    : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                        : `${process.env.React_App_IMAGES}/${todo.startImage}`

                        } />}
            >

                <span onClick={() => handleOpen(todo?.dc_id)}>
                    <Typography
                        style={{ fontWeight: "bold", textAlign: "center",fontFamily:'Moul', cursor: 'pointer', textDecoration: 'underline' }}

                    >
                        {
                            `${todo.constructionName}`
                        }

                    </Typography></span><br />
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`${todo.chiefName} (${todo.teamCount} ???????????????)`} */}
                    ??????????????? {`${todo?.chiefName}`} ({todo.teamCount} ??????????????? - {parseInt(todo?.builderCount) + parseInt(todo.workerCount)} ????????????)
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`???????????? ${todo.builderCount} | ???.?????????????????? ${parseInt(todo.workerCount) - parseInt(todo.femaleWorkerCount)} | ???.??????????????? ${todo.femaleWorkerCount}`} */}
                    ???????????? {parseInt(todo?.builderCount) - parseInt(todo?.painterCount)} | ??????????????????????????? {todo?.painterCount} | ?????????????????? {parseInt(todo.workerCount) - parseInt(todo?.femaleWorkerCount)} | ??????????????? {todo?.femaleWorkerCount}
                </Typography>


                <div style={{ padding: 15 }}>
                    {
                        todo.performances?.map((per,index) => <Typography key={index} >- {per.performance}</Typography>)
                    }
                </div>

                {todo.challenges !== '' ?
                <Typography style={{ color: 'red' }}>??????????????????:{todo.challenges}</Typography>
                :null}

                <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>

                    <Row>
                        {todo?.hasElectricianPlumber === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`?????????????????????????????????`} />
                            </Col>
                            : null}
                        {todo?.hasCeilBuilder === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`????????????????????????`} />
                            </Col>
                            : null}
                        {todo?.hasBlackSmith === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`??????????????????`} />
                            </Col>
                            : null}
                        {todo?.hasAirConditionerMan === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`???????????????????????????????????????????????????`} />
                            </Col>
                            : null}
                        {todo?.hasMirrorBuilder === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`???????????????????????????`} />
                            </Col>
                            : null}
                        {todo?.hasCarpenter === '1' ?
                            <Col xs={12} md={12} style={{ padding: 5 }}>
                                <TagBuilder title={`???????????????`} />
                            </Col>
                            : null}
                    </Row>
                    <Progresss status={todo?.status} />
                </div>
            </Card>
        </>
    )
}
