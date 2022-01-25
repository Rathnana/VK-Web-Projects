import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import axios from 'axios'
import UpdateCustomer from './UpdateCustomer';
import DelectCustomer from './DelectCustomer';


export default function CustomerTable({
    setLoading,
    loading,
    setSuccess,
    success
}) {
    const [customer, setCustomer] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        setLoading(true);
        getCustomer();
    }, [success])

    const getCustomer = async () => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);
        params.append('page', page)
        params.append('pageSize', pageSize)

        return await axios.post(
            `${process.env.React_App_URL}/get/getCustomerWithPagination.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                    // console.log(response?.data.data)
                    setLoading(false);
                    setSuccess(false);
                    setCustomer(response?.data)
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
            title: 'ID',
            dataIndex: 'customerId',
            key: 'customerId',
            
        },
        {
            title: 'ឈ្មោះអតិថិជន',
            dataIndex: 'customerName',
            key: 'customerName',
           
        },
        {
            title: 'ភេទ',
            dataIndex: 'gender',
            key: 'gender',

        },
        {
            title: 'សម្ព័នភាព',
            dataIndex: 'maritalStatus',
            key: 'maritalStatus',
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'partnerName',
            key: 'partnerName',
        },
        {
            title: 'ភេទ',
            dataIndex: 'partnerGender',
            key: 'partnerGender',
        },
        {
            title: 'ការងារ',
            dataIndex: 'taskType',
            key: 'taskType',
        },
        {
            title: 'ប្រភេទ',
            dataIndex: 'constructionType',
            key: 'constructionType',
        },
        {
            title: 'ឈ្មោះការដ្ឋាន',
            dataIndex: 'constructionName',
            key: 'constructionName',
        },
        {
            title: 'លេខទូរស័ព្ទ',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'ទីតាំងគម្រោង',
            dataIndex: 'constructionLocation',
            key: 'constructionLocation',
        },
        {
            title: 'ជាន់',
            dataIndex: 'countFloor',
            key: 'countFloor',
        },
        {
            title: 'ស្ថានភាព',
            dataIndex: 'priority',
            key: 'priority',
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
            title: 'បង្ហាញ',
            dataIndex: 'showInDashboard',
            key: 'showInDashboard',
            render: text => <p
                style={{
                    marginTop: "15px"
                }}
            >{text === "0" ? "yes" : "no"}</p>,
        },

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
        <Table
            columns={columns}
            dataSource={tableDataWithNo}
            scroll={{ x: 2200 }}
            loading={loading}
            style={{ marginTop: "20px" }}
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: customer?.totalDoc,
                pageSizeOptions: false,
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
