
import React, { useEffect, useState } from 'react'
import { Popover, Space, Table, Typography } from 'antd';
import axios from 'axios'
import moment from 'moment';

const { Paragraph, Text } = Typography;

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
        width: 60
    },
    {
        title: 'អតិថិជន',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 130
    },
    {
        title: 'ភេទ',
        dataIndex: 'gender',
        key: 'gender',
        width: 60
    },
    {
        title: 'ថ្ងៃចាប់ផ្ដើម',
        dataIndex: 'startDate',
        key: 'startDate',
        width: 110,
        render: (text, record) => (
            <Space size="middle">
                {moment(record?.startDate).format('DD-MM-YYYY')}
            </Space>
        ),
    },
    {
        title: 'ថ្ងៃបញ្ចប់',
        dataIndex: 'endDate',
        key: 'endDate',
        width: 110,
        render: (text, record) => (
            <Space size="middle">
                {record?.endDate === "0000-00-00" ? 'គ្មាន' : moment(record?.endDate).format('DD-MM-YYYY')}
            </Space>
        ),
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
    //     title: 'ផ្សេងៗ',
    //     dataIndex: 'remark',
    //     key: 'remark',
    //     width: 10,
    //     render: (text, record) => (
    //         <span style={{ cursor: 'pointer' }}  >
    //             <Popover placement="bottom" content={() => contentRemark(record?.remark)} title={null} trigger="hover">
    //                 <Text ellipsis >
    //                     {record?.remark}
    //                 </Text>
    //             </Popover>
    //         </span>
    //     )
    // }

];


export default function UnLawWorkTabel() {
    const [loading, setLoading] = React.useState(true);
    const [customer, setCustomer] = useState()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
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
            style={{marginBottom: 50 }}
            columns={columns}
            pagination={false}
            className='Info-table'
            scroll={{ x: 1200 }}
            loading={loading}
            dataSource={tableDataWithNo}
        />
    )
}
