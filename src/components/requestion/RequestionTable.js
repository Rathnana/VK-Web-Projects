
import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import EditRequest from './EditRequest';
import DeleteRequest from './DeleteRequest';
import axios from 'axios'

const columns = [
    {
        title: 'លរ',
        dataIndex: 'r_id',
        key: 'r_id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'ថ្ងៃស្នើសុំ',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'ថ្ងៃត្រូវការ',
        dataIndex: 'needDate',
        key: 'needDate',
    },
    {
        title: 'ឈ្មោះការដ្ឋាន',
        dataIndex: 'constructionId',
        key: 'constructionId',
    },
    {
        title: 'បរិយាយ',
        dataIndex: 'requestFor',
        key: 'requestFor',
    },
    {
        title: 'ស្ថានភាព',
        dataIndex: 'r_status',
        key: 'r_status',
    },

    {
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <EditRequest />
                <DeleteRequest r_id={record.r_id} />
            </Space>
        ),
    },
];


export default function RequestionTable() {
    const [request, setRequest] = useState()
    useEffect(() => {
        getRequest();
    }, [])
    const getRequest = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getRequestWithPagination.php`, params
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
