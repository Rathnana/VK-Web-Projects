import React, { useEffect, useState } from 'react'
import { Table, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import DelectReport from './DelectReport';
import EditReport from './EditReport';

export default function ReportTable({
    setLoading,
    loading,
    setSuccess,
    success
}) {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [customerId, setCustomerId] = useState(null)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('')
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getReports();
        setLoading(true);
    }, [success]);

    const getReports = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({
            page: page,
            pageSize: pageSize,
            customerId: customerId,
            userId: userId,
            startDate: startDate,
            endDate: endDate
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
                    return [];
                }
            });
    }

    const columns = [
        {
            title: 'លរ',
            dataIndex: 'no',
            key: 'no',
        }
        ,
        {
            title: 'កាលបរិច្ឆេទ',
            key: 'createdAt',
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.createdAt).format('YYYY-MM-DD')}
                </Space>
            ),
        },
        {
            title: 'ឈ្មោះការដ្ឋាន',
            dataIndex: 'constructionName',
            key: 'constructionName',
        },
        {
            title: 'ទីតាំង',
            dataIndex: 'constructionLocation',
            key: 'constructionLocation',
        },
        {
            title: 'មេការ',
            dataIndex: 'chiefName',
            key: 'chiefName',
        },
        {
            title: 'ចំនួនក្រុម',
            dataIndex: 'teamCount',
            key: 'teamCount',
        },
        {
            title: 'ជាង',
            dataIndex: 'builderCount',
            key: 'builderCount',
        },
        {
            title: 'កម្មករ',
            dataIndex: 'workerCount',
            key: 'workerCount',
        },
        {
            title: 'បញ្ហា',
            dataIndex: 'challenges',
            key: 'challenges',
        },

        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
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
        <Table
            columns={columns}
            dataSource={tableDataWithNo}
            scroll={{ x: 1200 }}
            className='table-customize'
            loading={loading}
            rowClassName={record => record?.challenges ? 'row-danger' : null}
            rowKey={record => record?.dc_id}
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: reports?.totalDoc,
                pageSizeOptions: false,
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
