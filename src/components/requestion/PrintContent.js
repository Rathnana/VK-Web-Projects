import React, { useRef, useEffect, useState } from 'react'
import { Button, Table } from 'antd';
import vklogo from '../../Image/vk-logo.png'
import moment from 'moment';
import ReactToPrint from "react-to-print";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Typography, Row, Col, Modal } from 'antd';
import axios from 'axios';
import { getRequestById } from '../../getDatabase';
const { Title } = Typography;


export default function PrintContent({ r_id, open, setOpen }) {

  const componentRef = useRef();
  const [data, setData] = useState();
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setLoading(true)
    getRequestDescription(r_id)
    let infoData = await getRequestById(r_id)
    if (infoData) {
      setInfo(infoData)
    }
  }, [r_id])
  const getRequestDescription = async (r_id) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({ requestId: r_id }));

    return await axios.post(
      `${process.env.React_App_URL}/get/getRequestDescription.php`, params
    )
      .then(async function (response) {
        if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
          setData(response?.data.data)
          setLoading(false)
          return response?.data;
        } else {
          return [];
        }
      });
  }

  const columns = [
    {
      title: 'លរ',
      dataIndex: 'requestNumber',
      key: 'requestNumber',
      align: 'center',
      render: text => <span>{text}</span>,
    },
    {
      title: 'បរិយាយ',
      dataIndex: 'requestFor',
      key: 'requestFor',
    },

    {
      title: 'បរិមាណ',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center'
    },
    {
      title: 'ឯកតា',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center'
    },

  ];

  // if(loading) return <div style={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}> <AiOutlineLoading3Quarters />  </div>

  return (
    <Modal
      title={null}
      visible={open}
      // width="40%"
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div
        className='display'
        style={{ fontFamily: 'KhmerOSSiemreap' }}
      >
        <div
          ref={componentRef}
          style={{
            paddingTop: "20px",
            paddingRight: "60px",
            paddingLeft: "60px",
            fontSize: "15px",
          }}
        >
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <img

                style={{
                  width: "200px",
                }}
                src={vklogo} />

            </Col >
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Title
                style={{
                  fontFamily: 'Moul',
                  color: '#1983e6',
                  marginTop: "60px",
                  fontWeight: 'normal',
                  textAlign: "center"
                }}
                level={4}
              >
                {`ការស្នើរសុំសម្ភារៈ`}
              </Title>
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "20px",
              paddingTop: "8px"
            }}
          >
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              ស្នើរទៅកាន់៖ <b>{info?.requestTo}</b>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              កាលបរិច្ឆេទស្នើរសុំ៖ <b>{moment(info?.date).format('DD-MM-YYYY')}</b>
            </Col>
          </Row>

          <Row
            style={{

              paddingTop: "8px"
            }}
          >
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ color: '#1890ff' }}>
              សម្រាប់ការដ្ឋាន៖ <b>{info?.constructionName}</b>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              កាលបរិច្ឆេទត្រូវការ៖ <b>{moment(info?.needDate).format('DD-MM-YYYY')}</b>
            </Col>

          </Row>
          <Row
            style={{

              paddingTop: "8px"
            }}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              គោលបំណង៖ <b>{info?.purpose}</b>
            </Col>

          </Row>
          <Row
          >
            <Col
              style={{
                marginTop: "20px",
              }}
              xs={24} sm={24} md={24} lg={24} xl={24}
            >
              <Table bordered size="small" pagination={false} columns={columns} dataSource={data} />
            </Col>

          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ position: "relative", bottom: '0px' }} >
              <p style={{
                marginTop: "20px",
                width: "100%",
                textAlign: "center",
                color: "#AAAAAA"
              }}>
                ស្នើរសុំដោយ {info?.lastName} {info?.firstName}
              </p>
            </Col>
          </Row>

        </div>

      </div>

      <div style={{ fontSize: 16 }}>
        <Row >
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <img

              style={{
                width: "130px",
              }}
              src={vklogo} />

          </Col >
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Title
              style={{
                fontFamily: 'Moul',
                color: '#1983e6',
                marginTop: "40px",
                fontWeight: 'normal',
                textAlign: "center",
                fontSize: 16
              }}
              level={5}
            >
              {`ការស្នើរសុំសម្ភារៈ`}
            </Title>
          </Col>
        </Row>

        <Row
          style={{
            marginTop: "20px",
            paddingTop: "8px"
          }}
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 3 }}>
                ស្នើរទៅកាន់៖ <b>{info?.requestTo}</b>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 3, color: '#1890ff' }}>
                សម្រាប់ការដ្ឋាន៖ <b>{info?.constructionName}</b>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 3 }}>
                កាលបរិច្ឆេទស្នើរសុំ៖ <b>{moment(info?.date).format('DD-MM-YYYY')}</b>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 3 }}>
                កាលបរិច្ឆេទត្រូវការ៖ <b>{moment(info?.needDate).format('DD-MM-YYYY')}</b>
              </Col>
            </Row>
          </Col>
          {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        ស្នើរទៅកាន់៖ {info.requestTo}
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        កាលបរិច្ឆេទស្នើរសុំ៖ {moment(info.date).format('DD-MM-YYYY')}
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        សម្រាប់ការដ្ឋាន៖ {info.constructionName}
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        កាលបរិច្ឆេទត្រូវការ៖ {moment(info.needDate).format('DD-MM-YYYY')}
                    </Col> */}

        </Row>
        <Row
          style={{

            paddingTop: "8px"
          }}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: 3 }}>
            គោលបំណង៖ <b>{info?.purpose}</b>
          </Col>

        </Row>
        <Row
        >
          <Col
            style={{
              marginTop: "20px",
            }}
            xs={24} sm={24} md={24} lg={24} xl={24}
          >
            <Table bordered size="small" className='requestTable' rowKey={record => record?.rd_id} pagination={false} columns={columns} dataSource={data} />
          </Col>

        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ position: "relative", bottom: '0px' }} >
            <p style={{
              marginTop: "20px",
              width: "100%",
              textAlign: "center",
              color: "#AAAAAA"
            }}>
              ស្នើរសុំដោយ {info?.lastName} {info?.firstName}
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <ReactToPrint
              trigger={() =>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  size='middle'
                >
                  PRINT
                </Button>}
              content={() => componentRef.current}
              documentTitle='.pdf'
            />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}
