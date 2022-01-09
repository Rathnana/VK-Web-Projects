import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
// import EditRequest from './EditRequest';
// import DeleteRequest from './DeleteRequest';
import axios from 'axios'
import DeleteContruction from './DeleteContruction';


const columns = [
    {
        title: 'លរ',
        dataIndex: 'c_id',
        key: 'c_id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'ID',
        dataIndex: 'customerId',
        key: 'customerId',
    },
    {
        title: 'ឈ្មោះការដ្ខាន',
        dataIndex: 'constructionName',
        key: 'constructionName',
    },
    {
        title: 'ប្រភេទ',
        dataIndex: 'constructingType',
        key: 'constructingType',
    },
    {
        title: 'ជាន់',
        dataIndex: 'countFloor',
        key: 'countFloor',
    },
    {
        title: 'ទីតាំង',
        dataIndex: 'c_address',
        key: 'c_address',
    },
    {
        title: 'ឈ្មោះអតិថិជន',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'លេខទូរស័ព្ទ',
        dataIndex: 'customerNumber',
        key: 'customerNumber',
    },
    {
        title: 'ថ្ងៃចាប់ផ្ដើម',
        dataIndex: 'startDate',
        key: 'startDate',
    },
    {
        title: 'ថ្ងៃបញ្ចប់',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: 'ស្ថានភាព',
        dataIndex: 'c_status',
        key: 'c_status',
    },
    {
        title: 'ផ្សេងៗ',
        dataIndex: 'c_remark',
        key: 'c_remark',
    },
    {
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <DeleteContruction id={record.c_id} />
            </Space>
        ),
    },
];

export default function ConstructionTable() {
    const [request, setRequest] = useState()
    useEffect(() => {
        getConstruction();
    }, [])
    const getConstruction = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getConstructionWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    console.log(response?.data.data)
                    setRequest(response?.data.data)
                    return response?.data;
                } else {
                    // openErrorNotification({ title: 'Failed', message: response.data })
                    console.log(response.data)
                    return [];
                }
            });
    }

    return (
        <Table
            columns={columns}
            dataSource={request}
            style={{ marginRight: 10 }}
        />
    )
}
