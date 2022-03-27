import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import axios from 'axios'
import DelectPettyCash from './DelectPettyCash'
import UpdatePettyCash from './UpdatePettyCash'
import { currencyFormat } from '../../getDatabase';
import moment from 'moment';
import { convertUSDtoKHR, currencyFormatKHR } from '../../own-comp';

export default function PettyCashTable({
    setLoading,
    loading,
    setSuccess,
    success,
    status,
    search
}) {

    const [pettyCash, setPettyCash] = useState();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        setLoading(true);
        getPettyCash();
    }, [success, status, search,page,pageSize])

    const getPettyCash = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)
        params.append('data', JSON.stringify({ status, search }))

        return await axios.post(
            `${process.env.React_App_URL}/get/getPrettyCashWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setPettyCash(response?.data);
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
            width: 60
        },
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 100,
            render: (text, record) => (
                <Space size="middle">
                    {moment(record?.date).format('DD-MM-YYYY')}
                </Space>
            ),
        },
        {
            title: 'ឈ្មោះអ្នកខ្ចី',
            dataIndex: 'borrowPerson',
            key: 'borrowPerson',
            width: 150
        },
        
        {
            title: <span>ចំនួនប្រាក់ (&#6107;)</span>,
            dataIndex: 'totalCashKh',
            key: 'totalCashKh',
            width: 220,
            render: (text, record) => (
                <Space>
                    {currencyFormatKHR(record?.totalCashKh)}
                </Space>
            )
        },
        {
            title: 'ចំនួនប្រាក់ ($)',
            dataIndex: 'totalCash',
            key: 'totalCash',
            width: 220,
            render: (text, record) => (
                <Space>
                    {currencyFormat(record?.totalCash)}
                </Space>
            )
        },
        {
            title: 'ប្រភេទ',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            
        },
        {
            title: 'ឈ្មោះអ្នកធ្វើ',
            dataIndex: 'lendedBy',
            key: 'lendedBy',
            width: 150,
            render: (text, record) => (
                <Space>
                    {record?.lastName + " " + record?.firstName}
                </Space>
            )
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 120,
        }
        ,

        {
            title: 'ផ្សេងៗ',
            dataIndex: 'remark',
            key: 'remark',
            width: 250,
        },
        {
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
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

    const onRowClick=(e)=>{
        // console.log(e)
    }

    return (
        <Table
            scroll={{ x: 1200 }}
            style={{ marginTop: "20px" }}
            columns={columns}
            dataSource={loading ? []:tableDataWithNo}
            rowClassName={record => record?.status === 'បានទូរទាត់' ? 'finished-row' : ''}
            loading={loading}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => onRowClick(record), // click row
                    onDoubleClick: event => { }, // double click row
                    onContextMenu: event => { }, // right button click row
                    onMouseEnter: event => { }, // mouse enter row
                    onMouseLeave: event => { }, // mouse leave row
                };
            }}
            rowKey={record => record?.pc_id}
            className='table-customize'
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: pettyCash?.totalDoc,
                pageSizeOptions: ['100', '200', '300'],
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
