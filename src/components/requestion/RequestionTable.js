
import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import ToPrint from './ToPrint';
import DeleteRequest from './DeleteRequest';
import axios from 'axios'
import UpdateRequestion from './UpdateRequestion';
import moment from 'moment';

export default function RequestionTable({
    setLoading,
    loading,
    setSuccess,
    success,
    constructionId,
    date
}) {
    const [request, setRequest] = useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        setLoading(true);
        getRequests();
    }, [success, constructionId, date])

    const getRequests = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({ page: page, pageSize: pageSize, constructionId, date: date?.format('YYYY-MM-DD') }))


        return await axios.post(
            `${process.env.React_App_URL}/get/getRequestWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setLoading(false);
                    setSuccess(false);
                    setRequest(response?.data)
                    // console.log(response?.data)
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
            width: 80
        },
        {
            title: 'សម្រាប់ការដ្ឋាន',
            dataIndex: 'constructionName',
            key: 'constructionName',
            width: 250
        },
        {
            title: 'ថ្ងៃស្នើសុំ',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.date).format('DD-MM-YYYY')}
                </Space>
            ),
        },
        {
            title: 'ថ្ងៃត្រូវការ',
            dataIndex: 'needDate',
            key: 'needDate',
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.needDate).format('DD-MM-YYYY')}
                </Space>
            ),
        },
        {
            title: "ស្នើរទៅកាន់",
            dataIndex: "requestTo",
            key: "requestTo",
            width: 120
        },
        
        {
            title: 'គោលបំណង',
            dataIndex: 'purpose',
            key: 'purpose',
            width: 250
        },
        {
            title: 'អ្នកស្នើរសុំ',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 150,
            render: (text, record) => (
                <Space size="middle">
                    {record?.firstName + " " + record?.lastName}

                </Space>
            ),

        },

        {
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 140,
            render: (text, record) => (
                <Space size="middle">
                    <ToPrint
                        date={record.date}
                        startDate={record.needDate}
                        requestTo={record.requestTo}
                        purpose={record.purpose}
                        r_id={record.r_id}
                        constructionName={record.constructionName}
                        info={record}
                    />
                    <UpdateRequestion
                        setSuccess={setSuccess}
                        r_id={record.r_id}
                        requests={record}
                    />
                    <DeleteRequest setSuccess={setSuccess} r_id={record.r_id} />

                </Space>
            ),
        },
    ];

    let tableDataWithNo = []

    request?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (request?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })
    return (
        <Table
            scroll={{ x: 1200 }}
            style={{ marginTop: "20px" }}
            columns={columns}
            dataSource={tableDataWithNo}
            loading={loading}
            rowKey={record => record?.r_id}
            className='table-customize'
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: request?.totalDoc,
                pageSizeOptions: ['100','200','300'],
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
