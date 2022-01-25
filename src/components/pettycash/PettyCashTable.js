import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import axios from 'axios'
import DelectPettyCash from './DelectPettyCash'
import UpdatePettyCash from './UpdatePettyCash'

export default function PettyCashTable({
    setLoading,
    loading,
    setSuccess,
    success
}) {

    const [pettyCash, setPettyCash] = useState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        setLoading(true);
        getPettyCash();
    }, [success])

    const getPettyCash = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)

        return await axios.post(
            `${process.env.React_App_URL}/get/getPrettyCashWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setPettyCash(response?.data);
                    setLoading(false);
                    setSuccess(false);
                    // console.log(response?.data.data);
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
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ឈ្មោះអ្នកខ្ចី',
            dataIndex: 'borrowPerson',
            key: 'borrowPerson',
        },
        {
            title: 'ឈ្មោះអ្នកផ្ដល់',
            dataIndex: 'lendedBy',
            key: 'lendedBy',
            render: (text, record) => (
                <Space>
                    {record?.lastName + " " + record?.firstName}
                </Space>
            )
        },
        {
            title: 'ចំនួនទឹកប្រាក់',
            dataIndex: 'totalCash',
            key: 'totalCash',
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
        }
        ,

        {
            title: 'ផ្សេងៗ',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            key: 'action',
            fixed: 'rigth',
            render: (text, record) => (
                <Space size="middle">
                    <UpdatePettyCash
                        setSuccess={setSuccess}
                        pc_id={record.pc_id}
                        pettyCash={record}

                    />
                    <DelectPettyCash setSuccess={setSuccess} id={record.pc_id} />
                </Space>
            ),
        },
    ];

    let tableDataWithNo = []

    pettyCash?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (pettyCash?.totalDoc - (pageAdd + index)) + 1 }
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

            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: pettyCash?.totalDoc,
                pageSizeOptions: false,
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
