import { Card, Typography } from 'antd'
import React, { useState } from 'react'
import { getTotalBuilder, getTotalWorker } from '../../own-comp'
import ModalDetail from './ModalDetail'
import Progresss from './Progresss'

export default function CardDailyConstruct({ todo, setOpenDetail, setDailyConstructId }) {

    const handleOpen = (e) => {
        setDailyConstructId(e)
        setOpenDetail(true)
    }

    return (
        <>
            <Card
                bordered={false}
                style={{
                    background: "#f0f0f0", borderRadius: 5,position:'relative',paddingBottom:10
                }}
                className='card-report'
                cover={
                    <img
                        className='image-card'
                        alt="example"
                        src={
                            todo?.resultImage === "" && todo?.startImage === "" ?
                                "https://www.chanchao.com.tw/ctg/images/default.jpg"
                                : todo?.resultImage !== "" ? `${process.env.React_App_IMAGES}/${todo.resultImage}`
                                    : `${process.env.React_App_IMAGES}/${todo.startImage}`

                        } />}
            >

                <span onClick={() => handleOpen(todo?.dc_id)}>
                    <Typography
                        style={{ fontWeight: "bold", textAlign: "center", cursor: 'pointer', textDecoration: 'underline' }}

                    >
                        {
                            `${todo.constructionName}`
                        }

                    </Typography></span><br />
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`${todo.chiefName} (${todo.teamCount} ក្រុម)`} */}
                    មេកា៖ {`${todo?.chiefName}`} ({todo.teamCount} ក្រុម - {parseInt(todo?.builderCount) + parseInt(todo.workerCount)} នាក់)
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                    {/* {`ជាង៖ ${todo.builderCount} | ក.ប្រុស៖ ${parseInt(todo.workerCount) - parseInt(todo.femaleWorkerCount)} | ក.ស្រី៖ ${todo.femaleWorkerCount}`} */}
                    ជាងៈ {parseInt(todo?.builderCount) - parseInt(todo?.painterCount)} | ជាងថ្នាំៈ {todo?.painterCount} | ប្រុសៈ {parseInt(todo.workerCount) - parseInt(todo?.femaleWorkerCount)} | ស្រីៈ {todo?.femaleWorkerCount}
                </Typography>


                <div style={{ padding: 15 }}>
                    {
                        todo.performances?.map((per) => <Typography >- {per.performance}</Typography>)
                    }
                </div>

                <Typography style={{ color: 'red' }}>{todo.challenges}</Typography>

                <div style={{position:'absolute',bottom:10,left:10,right:10}}>
                    <Progresss status={todo?.status} />
                </div>
            </Card>
        </>
    )
}
