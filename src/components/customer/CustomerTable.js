import React, { useState, useEffect } from 'react'
import { Table, Space, Typography, Popover, Button, Spin } from 'antd';
import axios from 'axios'
import UpdateCustomer from './UpdateCustomer';
import DelectCustomer from './DelectCustomer';
import moment from 'moment';

const { Paragraph, Text } = Typography
export default function CustomerTable({
    setLoading,
    loading,
    setSuccess,
    success,
    taskType,
    priority,
    constructionType,
    search
}) {
    const [customer, setCustomer] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    useEffect(() => {
        setLoading(true);
        getCustomer();
    }, [success, taskType, priority, search, constructionType, page, pageSize])

    const getCustomer = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)
        // params.append('taskType', taskType)
        params.append('data', JSON.stringify({
            taskType: taskType ? taskType : '',
            priority: priority ? priority : '',
            constructionType: constructionType ? constructionType : '',
            search,
            page,
            pageSize
        }))
        return await axios.post(
            `${process.env.React_App_URL}/get/getCustomerWithPagination.php`, params
        )
            .then(async function (response) {
                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    setLoading(false);
                    setSuccess(false);
                    setCustomer(response?.data)
                    return response?.data;
                } else {

                    return [];
                }
            });
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
            width: 50
        },
        {
            title: 'ID',
            dataIndex: 'customerId',
            key: 'customerId',
            width: 70

        },
        {
            title: 'ឈ្មោះអតិថិជន',
            dataIndex: 'customerName',
            key: 'customerName',
            width: 120
        },
        // {
        //     title: 'ភេទ',
        //     dataIndex: 'gender',
        //     key: 'gender',
        //     width: 60
        // },
        // {
        //     title: 'សម្ព័នភាព',
        //     dataIndex: 'maritalStatus',
        //     key: 'maritalStatus',
        //     width: 110,
        //     render: (text, record) => (
        //         <>
        //             {
        //                 record?.maritalStatus === 'មានគ្រួសារ' ?
        //                     <span style={{ cursor: 'pointer' }}>
        //                         <Popover placement="bottom" content={() => content(record)} title={null} trigger="hover">
        //                             <Text ellipsis >
        //                                 {record?.maritalStatus}
        //                             </Text>
        //                         </Popover>
        //                     </span>

        //                     :
        //                     <span>{record?.maritalStatus}</span>
        //             }
        //         </>
        //     )
        // },

        {
            title: 'ការងារ',
            dataIndex: 'taskType',
            key: 'taskType',
            width: 120,
        },
        {
            title: 'ប្រភេទ',
            dataIndex: 'constructionType',
            key: 'constructionType',
            width: 110,
        },
        {
            title: 'ឈ្មោះការដ្ឋាន',
            dataIndex: 'constructionName',
            key: 'constructionName',
            width: 150,
        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
            width: 120,
        },
        {
            title: 'ទីតាំងគម្រោង',
            dataIndex: 'constructionLocation',
            key: 'constructionLocation',
            width: 150,
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
        // {
        //     title: 'ជាន់',
        //     dataIndex: 'countFloor',
        //     key: 'countFloor',
        //     width: 90,
        // },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'priority',
            key: 'priority',
            width: 120,
        },
        {
            title: 'ថ្ងៃចាប់ផ្ដើម',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 100,
            render: (text, record) => (
                <span>
                    {moment(record?.startDate).format('DD-MM-YYYY')}
                </span>
            )
        },
        {
            title: 'ថ្ងៃបញ្ចប់',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 100,
            render: (text, record) => (
                <span>
                    {record?.endDate !== "0000-00-00" ? moment(record?.endDate).format('DD-MM-YYYY') : 'គ្មាន'}
                </span>
            )
        },
        // {
        //     title: 'បង្ហាញ',
        //     dataIndex: 'showInDashboard',
        //     key: 'showInDashboard',
        //     width: 80,
        //     render: text => <p
        //         style={{
        //             marginTop: "15px"
        //         }}
        //     >{text === "0" ? "no" : "yes"}</p>,
        // },

        {
            title: 'ផ្សេងៗ',
            dataIndex: 'remark',
            key: 'remark',
            width: 150,
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }}  >
                    <Popover placement="bottom" content={() => contentRemark(record?.remark)} title={null} trigger="hover">
                        <Text ellipsis >
                            {record?.remark}
                        </Text>
                    </Popover>
                </span>
            )
        },
        {
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (text, record) => (
                <Space size="middle">

                    <UpdateCustomer
                        setSuccess={setSuccess}
                        c_id={record.c_id}
                        customer={record}
                    />
                    <DelectCustomer setSuccess={setSuccess} id={record.c_id} />
                </Space>
            ),
        },
    ];
    let tableDataWithNo = []

    customer?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (customer?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })

    return (
        <>
        <Table
            columns={columns}
            dataSource={loading ? [] : tableDataWithNo}
            scroll={{ x: 1200 }}
            loading={loading}
            rowKey={record => record?.c_id}
            rowClassName={record => record?.priority==='បញ្ចប់' ? 'finished-row': record?.priority==='ផ្អាក' ? 'row-danger' : null }
            className='table-customize'
            style={{ marginTop: "20px" }}
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: customer?.totalDoc,
                pageSizeOptions: ['100','200','300'],
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
        </>

    )
}
