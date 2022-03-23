
import React, { useEffect, useState } from 'react'
import { Popover, Space, Table, Typography } from 'antd';
import axios from 'axios'
import moment from 'moment';

const { Paragraph, Text } = Typography;
export default function UnLawWorkTabel() {
    const [loading, setLoading] = React.useState(true);
    const [customer, setCustomer] = useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        setLoading(true);
        getcustomer();
    }, [page, pageSize])
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
                    return response?.data;
                } else {
                    console.log(response.data)
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
            fontWeight: 'bold',
            fixed:'left',
            width: 60
        },
        {
            title: 'អតិថិជន',
            dataIndex: 'customerName',
            key: 'customerName',
            fixed:'left',
            width: 100
        },

        {
            title: 'ថ្ងៃចាប់ផ្ដើម',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 100,
            render: (text, record) => (
                <span size="middle">
                    {moment(record?.startDate).format('DD-MM-YYYY')}
                </span>
            ),
        },

        {
            title: 'ការងារ',
            dataIndex: 'taskType',
            key: 'taskType',
            width: 90
        },

        {
            title: 'ប្រភេទ',
            dataIndex: 'constructionType',
            key: 'constructionType',
            width: 90
        },

        {
            title: 'ស្ថានភាព',
            dataIndex: 'priority',
            key: 'priority',
            width: 90
        },
        {
            title: 'ទីតាំងគម្រោង',
            dataIndex: 'constructionLocation',
            key: 'constructionLocation',
            width: 100,
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
        {
            title: 'ផ្សេងៗ',
            dataIndex: 'remark',
            key: 'remark',
            width:100,
            render: (text, record) => (
                <span style={{ cursor: 'pointer' }}  >
                    <Popover placement="bottom" content={() => contentRemark(record?.remark)} title={null} trigger="hover">
                        <Text ellipsis='rows' >
                            {record?.remark}
                        </Text>
                    </Popover>
                </span>
            )
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
            // size="small"
            style={{ marginBottom: 50 }}
            scroll={{ x: 1200 }}
            columns={columns}
            rowKey={record => record?.c_id}
            // className='Info-table'
            // className='table-customize'
            loading={loading}
            dataSource={loading ? [] : tableDataWithNo}
            pagination={{
                position: ["bottomLeft"],
                size: 'small',
                total: customer?.totalDoc,
                pageSizeOptions: ['20', '50', '100'],
                pageSize: pageSize,
                onChange: ((page, pageSize) => { setPage(page); setPageSize(pageSize) })
            }}
        />
    )
}
