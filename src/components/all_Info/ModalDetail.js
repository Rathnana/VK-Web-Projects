import { Col, Button, Row, Space, Typography, Modal, Image, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import Team from './Team'
import { MdOutlineConstruction } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom'
import { FaChartLine } from 'react-icons/fa'
import { getTotalBuilder, getTotalWorker } from '../../own-comp'
import TagBuilder from './TagBuilder'

export default function ModalDetail({ open, setOpen, id }) {
    const [report, setReport] = useState({})
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = React.useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        setLoading(true)
        getConstructById(id);
    }, [id])

    const getConstructById = async (id) => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({ dc_id: id }));

        return await axios.post(
            `${process.env.React_App_URL}/get/getDailyConstructById.php`, params
        )
            .then(async function (response) {
                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setReport(response?.data)
                    setLoading(false)
                    setSuccess(false);
                    return response?.data;
                } else {
                    setLoading(false)
                    return [];
                }

            });
    }

    return (
        <Modal
            title={null}
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
            className="modal-detail-card"
        >
            <Row
                style={{
                    marginTop: "45px"
                }}
            >
                {
                    loading ? <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="loading-data"><Spin indicator={antIcon} /></div>
                    </Col>
                        :
                        <>
                            <Col
                                xs={24} sm={24} md={24} lg={24} xl={24}
                                style={{
                                    background: "#ffd359",
                                    height: "45px",
                                    textAlign: "center",
                                    padding: "10px",
                                    fontFamily:'Moul',
                                    fontWeight: "bold",
                                    fontSize: "11pt"
                                }}
                            >
                                {`${report?.constructionName} - `}<Typography.Text type='danger' style={{fontFamily:'KhmerOSSiemreap'}}>{moment(report?.createdAt).format("DD/MM/YYYY")}</Typography.Text>
                            </Col>

                            <Col
                                xs={24} sm={24} md={24} lg={24} xl={24}
                                style={{
                                    padding: "5px"
                                }}

                            >
                                <Row
                                    style={{
                                        marginTop: "10px",
                                        // fontWeight: "bold",
                                        fontSize: "15px",
                                        fontFamily: "KhmerOSSiemreap",
                                        // color: '#616161',
                                    }}
                                >
                                    <Col xs={6} style={{ padding: 5 }}><MdOutlineConstruction />&nbsp;&nbsp;មេកា</Col>
                                    <Col xs={18} style={{ fontWeight: 'bold', padding: 5 }}>
                                        : {`${report?.chiefName}`} ({report?.team?.length} ក្រុម - {getTotalBuilder(report?.team) + getTotalWorker(report?.team)} នាក់)
                                    </Col>
                                </Row>

                                <Row
                                    style={{
                                        fontSize: "15px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Col xs={24} style={{ padding: 5, paddingLeft: 28 }}>

                                        ជាង: <b>{getTotalBuilder(report?.team) - parseInt(report?.painterCount)}</b> |
                                        ថ្នាំ: <b>{report?.painterCount}</b> |
                                        ប្រុស: <b>{getTotalWorker(report?.team) - parseInt(report?.femaleWorkerCount)}</b> |
                                        ស្រី: <b>{report?.femaleWorkerCount}</b>
                                    </Col>
                                </Row>

                                {
                                    report?.team?.map(team => <Team key={team.dt_id} team={team} />)
                                }

                                <Row
                                    style={{
                                        fontSize: "15px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <Col xs={6} style={{ padding: 5, paddingLeft: 35 }}>
                                        បញ្ហា
                                    </Col>
                                    <Col xs={18} style={{ padding: 5 }}>
                                        : <b style={{ color: 'red' }}>{report?.challenges}</b>
                                    </Col>
                                </Row>

                                <Row style={{ marginBottom: 20 }}>
                                    {report?.hasElectricianPlumber === '1' ?
                                        <Col xs={8} md={6} style={{ padding: 5 }}>
                                            <TagBuilder title={`ជាងទឹកភ្លើង`} />
                                        </Col>
                                        : null}
                                    {report?.hasCeilBuilder === '1' ?
                                        <Col xs={8} md={6} style={{ padding: 5 }}>
                                            <TagBuilder title={`ជាងពិដាន`} />
                                        </Col>
                                        : null}
                                    {report?.hasBlackSmith === '1' ?
                                        <Col xs={8} md={6} style={{ padding: 5 }}>
                                            <TagBuilder title={`ជាងដែក`} />
                                        </Col>
                                        : null}
                                    {report?.hasAirConditionerMan === '1' ?
                                        <Col xs={8} md={6} style={{ padding: 5 }}>
                                            <TagBuilder title={`ជាងម៉ាស៊ីនត្រជាក់`} />
                                        </Col>
                                        : null}
                                    {report?.hasMirrorBuilder === '1' ?
                                        <Col xs={8} md={6} style={{ padding: 5 }}>
                                            <TagBuilder title={`ជាងកញ្ជក់`} />
                                        </Col>
                                        : null}
                                </Row>

                                <Row
                                    style={{
                                        fontSize: "15px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Col xs={24} style={{ padding: 5, fontWeight: 'bold', background: '#e6f7ff' }}><FaChartLine style={{ fontSize: 13 }} />&nbsp;&nbsp;ស្ថិតិកម្លាំងសម្រាប់ថ្ងៃស្អែក:</Col>
                                    <Col xs={24} style={{ padding: 5, paddingLeft: 28 }}>
                                        ជាង: <b>{report?.builderCountTmr}</b> |
                                        ថ្នាំ: <b>{report?.painterCountTmr}</b> |
                                        ប្រុស: <b>{report?.workerCountTmr}</b> |
                                        ស្រី: <b>{report?.femaleWorkerCountTmr}</b>
                                    </Col>
                                </Row>

                                <Row
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    <Col xs={24} md={12} style={{ padding: 5 }}>
                                        {
                                            report?.startImage !== '' ?
                                                <>
                                                    <Image
                                                        style={{
                                                            objectFit: "cover"
                                                        }}
                                                        width={200}
                                                        height={200}
                                                        src={`${process.env.React_App_IMAGES}/${report?.startImage}`}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <Image
                                                        style={{
                                                            objectFit: "cover"
                                                        }}
                                                        width={200}
                                                        height={200}
                                                        src={"error"}
                                                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                                    />
                                                </>
                                        }


                                    </Col>
                                    <Col xs={24} md={12} style={{ padding: 5 }}>
                                        {
                                            report?.resultImage !== '' ?
                                                <>
                                                    <Image
                                                        style={{
                                                            objectFit: "cover"
                                                        }}
                                                        width={200}
                                                        height={200}
                                                        src={`${process.env.React_App_IMAGES}/${report?.resultImage}`}
                                                    />

                                                </>
                                                :
                                                <>
                                                    <Image
                                                        style={{
                                                            objectFit: "cover"
                                                        }}
                                                        width={200}
                                                        height={200}
                                                        src={"error"}
                                                        fallback="data:image/png;base64,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"
                                                    />
                                                </>
                                        }
                                    </Col>

                                </Row>

                            </Col>
                        </>

                }

            </Row>
        </Modal>
    )
}
