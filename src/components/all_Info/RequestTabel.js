import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd';
import axios from 'axios'
import moment from 'moment';

const columns = [
    {
        title: 'លរ',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'ថ្ងៃស្នើសុំ',
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => (
            <Space size="middle">
                {moment(record?.date).format('DD-MMM-YYYY')}
            </Space>
        ),
    },
    {
        title: 'ថ្ងៃត្រូវការ',
        dataIndex: 'needDate',
        key: 'needDate',
        render: (text, record) => (
            <Space size="middle">
                {moment(record?.needDate).format('DD-MMM-YYYY')}
            </Space>
        ),
    },
    {
        title: "ស្នើរទៅកាន់",
        dataIndex: "requestTo",
        key: "requestTo"
    },
    {
        title: 'សម្រាប់ការដ្ឋាន',
        dataIndex: 'constructionName',
        key: 'constructionName',
    },
    {
        title: 'គោលបំណង',
        dataIndex: 'purpose',
        key: 'purpose',
    },
    {
        title: 'អ្នកស្នើរសុំ',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => (
            <Space size="middle">
                {record?.firstName + " " + record?.lastName}

            </Space>
        ),
    }
];


export default function RequestTabel() {
    const [request, setRequest] = useState()
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    useEffect(() => {
        getRequest();
         setLoading(true);
    }, [])
    const getRequest = async () => {

        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({ page: page, pageSize: pageSize }))


        return await axios.post(
            `${process.env.React_App_URL}/get/getRequestWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setRequest(response?.data);
                    setLoading(false);
                    // console.log(response?.data.data)
                    return response?.data;
                } else {
                    console.log(response.data)
                    return [];
                }
            });
    }
    let tableDataWithNo = []

    request?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (request?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })
    return (
        <Table
            columns={columns}
            pagination={false}
            scroll={{ x: 1000 }}
            dataSource={tableDataWithNo}
            loading={loading}
        />
    )
}
