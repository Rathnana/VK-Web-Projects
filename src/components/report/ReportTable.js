import React, { useEffect, useState } from 'react'
import { Table, Space, Typography, Popover, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import DelectReport from './DelectReport';
import EditReport from './EditReport';
import { AiFillEye } from 'react-icons/ai';
import ModalDetail from '../all_Info/ModalDetail';

const { Paragraph ,Text} = Typography;

export default function ReportTable({
    setLoading,
    loading,
    setSuccess,
    success,
    range,
    customerId,
    chiefId
}) {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const [dailyConstructId, setDailyConstructId] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);

    useEffect(() => {
        setLoading(true);
        getReports();
    }, [success, range, customerId, chiefId,page,pageSize]);

    const getReports = async () => {
        const params = new FormData();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({
            page: page,
            pageSize: pageSize,
            customerId: customerId,
            userId: sessionStorage.getItem("u_id"),
            startDate: range?.startDate !== null ? range?.startDate : '',
            endDate: range?.endDate !== null ? range?.endDate : '',
            chiefId: chiefId
        }));

        return await axios.post(
            `${process.env.React_App_URL}/get/getDailyConstructWithPaginationAdmin.php`, params
        )
            .then(async function (response) {
                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setReports(response?.data);
                    setLoading(false);
                    setSuccess(false);
                    return response?.data;
                } else {
                    setLoading(false);
                    setSuccess(false);
                    return [];
                }
            });
    }

    const handleOpenDetail=(e)=>{
        setDailyConstructId(e)
        setOpenDetail(true)
    }

    const contentRemark = (e) => (
        <Paragraph style={{ fontSize: 16, width: 300, textAlign: 'justify' }}>
            {e}
        </Paragraph>
    )

    const columns = [
        {
            title: 'លរ',
            dataIndex: 'no',
            key: 'no',
            fontWeight:'bold',
            width: 60
        }
        ,
        {
            title: 'កាលបរិច្ឆេទ',
            key: 'createdAt',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.createdAt).format('DD-MM-YYYY')}
                </Space>
            ),
        },
        {
            title: 'ឈ្មោះការដ្ឋាន',
            dataIndex: 'constructionName',
            key: 'constructionName',
            width: 250
        },
        {
            title: 'ទីតាំង',
            dataIndex: 'constructionLocation',
            key: 'constructionLocation',
            width: 200,
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }}  >
                    <Popover placement="bottom" content={() => contentRemark(record?.constructionLocation)} title={null} trigger="hover">
                        <Text ellipsis >
                            {record?.constructionLocation}
                        </Text>
                    </Popover>
                </span>
            )
        },
        {
            title: 'មេការ',
            dataIndex: 'chiefName',
            key: 'chiefName',
            width: 150
        },
        {
            title: 'ចំនួនក្រុម',
            dataIndex: 'teamCount',
            key: 'teamCount',
            width: 100
        },
        {
            title: 'ជាង',
            dataIndex: 'builderCount',
            key: 'builderCount',
            width: 100
        },
        {
            title: 'កម្មករ',
            dataIndex: 'workerCount',
            key: 'workerCount',
            width: 100
        },
        {
            title: 'បញ្ហា',
            dataIndex: 'challenges',
            key: 'challenges',
            width: 160,
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }}  >
                    <Popover placement="bottom" content={() => contentRemark(record?.challenges)} title={null} trigger="hover">
                        <Text ellipsis >
                            {record?.challenges}
                        </Text>
                    </Popover>
                </span>
            )
        },

        {
            title: '',
            fixed: 'right',
            align: 'center',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={()=>handleOpenDetail(record?.dc_id)} type="primary" shape="circle" icon={<AiFillEye style={{ marginTop: '5px' }} />} size='middle' />

                    <EditReport reports={record} setSuccess={setSuccess} id={record.dc_id} />
                    <DelectReport dc_id={record.dc_id} setSuccess={setSuccess} />
                </Space>
            ),
        },
    ];

    let tableDataWithNo = []

    reports?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (reports?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })

    return (
        <>
        <ModalDetail setOpen={setOpenDetail} open={openDetail} id={dailyConstructId} />
        
        <Table
            columns={columns}
            dataSource={loading ? []:tableDataWithNo}
            scroll={{ x: 1200 }}
            className='table-customize'
            loading={loading}
            rowClassName={record => record?.challenges ? 'row-danger' : null}
            rowKey={record => record?.dc_id}
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: reports?.totalDoc,
                // pageSizeOptions: false,
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
        </>

    )
}
