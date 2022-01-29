import React, { useEffect, useState } from 'react'
import { Table, Space } from 'antd';
import axios from 'axios'
import DelectUser from './DelectUser';
import EditUser from './EditUser';


export default function UsersTable({
    setLoading,
    loading,
    setSuccess,
    success,
    search
}) {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    useEffect(() => {
        getUsers();
        setLoading(true);
    }, [success, search])

    const getUsers = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)
        params.append('data', JSON.stringify({ search }))
        return await axios.post(
            `${process.env.React_App_URL}/get/getUser.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setUsers(response?.data)
                    setLoading(false);
                    setSuccess(false);
                    return response?.data;
                } else {
                    setLoading(true)
                    return [];
                }
            });
    }

    const columns = [
        {
            title: 'លរ',
            dataIndex: 'no',
            key: 'no',
            width:80
        },
        {
            title: 'ឈ្មោះអ្នកប្រើប្រាស់',
            dataIndex: 'username',
            key: 'username',
            width:250
        },
        {
            title: 'គោត្តនាម',
            dataIndex: 'lastName',
            key: 'lastName',
            width:150

        },
        {
            title: 'នាម',
            dataIndex: 'firstName',
            key: 'firstName',
            width:150
        },
        {
            title: 'ប្រភេទ',
            dataIndex: 'role',
            key: 'role',
            width:150
        },
        {
            key: 'action',
            align:'center',
            fixed:'right',
            width:100,
            render: (text, record) => (
                <Space size="large">
                    <EditUser setSuccess={setSuccess} users={record} userId={record?.u_id} />
                    <DelectUser setSuccess={setSuccess} userid={record?.u_id} />
                </Space>
            ),
        }

    ];

    let tableDataWithNo = []

    users?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (users?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })
    return <Table
        style={{ marginTop: "20px" }}
        columns={columns}
        scroll={{ x: 1200 }}
        dataSource={tableDataWithNo}
        loading={loading}
        className='table-customize'
        rowKey={record => record?.u_id}
        pagination={{
            position: ["bottomLeft"],
            size: 'small',
            total: users?.totalDoc,
            pageSizeOptions: false,
            pageSize: pageSize,
            onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
        }}

    />
}
