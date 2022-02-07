
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import axios from 'axios'

const columns = [
    {
        title: 'លរ',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'អតិថិជន',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'ភេទ',
        dataIndex: 'gender',
        key: 'gender',
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
        dataIndex: 'priority',
        key: 'priority',
    },
    {
        title: 'ទីតាំងគម្រោង',
        dataIndex: 'constructionLocation',
        key: 'constructionLocation',
    },
    {
        title: 'ផ្សេងៗ',
        dataIndex: 'remark',
        key: 'remark',
    }

];


export default function UnLawWorkTabel() {
    const [loading, setLoading] = React.useState(true);
    const [customer, setCustomer] = useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    useEffect(() => {
        setLoading(true);
        getcustomer();
    }, [])
    const getcustomer = async () => {

        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);
        params.append('data', JSON.stringify({ page: page, pageSize: pageSize }))


        return await axios.post(
            `${process.env.React_App_URL}/get/getCustomerWithPaginationDashboard.php`, params
        )
            .then(async function (response) {

                if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                    setCustomer(response?.data)
                    setLoading(false);
                    console.log(response?.data.data)
                    return response?.data;
                } else {
                    console.log(response.data)
                    return [];
                }
            });
    }
    let tableDataWithNo = []

    customer?.data?.map((record, index) => {

        let pageAdd = page > 1 ? ((page * pageSize) - pageSize) + 1 : 1;

        let data = { ...record, no: (customer?.totalDoc - (pageAdd + index)) + 1 }
        tableDataWithNo.push(data)

    })
    return (
        <Table
            // size="small"
            columns={columns}
            pagination={false}
            className='Info-table'
            scroll={{ x: 1000 }}
            loading={loading}
            dataSource={tableDataWithNo}
        />
    )
}
