import React, { useEffect, useState } from 'react'
import { Table, Space } from 'antd';
import axios from 'axios'
import DelectUser from './DelectUser';
import EditUser from './EditUser';
import { Spin, Alert } from 'antd';

const columns = [
    {
        title: 'ឈ្មោះ',
        dataIndex: 'username',
        key: 'username',

    },
    {
        title: 'លេខសម្ងាត',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'ប្រភេទ',
        dataIndex: 'role',
        key: 'role',
    },
    {
        key: 'action',
        render: (text, record) => (
            <Space size="middle">

                <EditUser role={record.role} username={record.username} password={record.password} userid={record.u_id} />
            </Space>
        ),
    },
    {
        key: 'delect',
        render: (text, record) => (
            <Space size="middle">
                <DelectUser userid={record.u_id} />

            </Space>
        ),
    },

];
export default function UsersTable() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        return await axios.post(
            `${process.env.React_App_URL}/get/getUser.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    console.log(response?.data)
                    setUsers(response?.data)
                    return response?.data;
                } else {
                    // openErrorNotification({ title: 'Failed', message: response.data })
                    return [];
                }
            });
    }
    return users ? <Table
        columns={columns}
        dataSource={users}
        style={{ marginRight: 10 }}
    /> : <Spin tip="Loading...">
        <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
        />
    </Spin>
}
