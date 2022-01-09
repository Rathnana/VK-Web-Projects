import React, { useState, useEffect } from 'react'
import { Table, Space } from 'antd';
// import EditRequest from './EditRequest';
// import DeleteRequest from './DeleteRequest';
import axios from 'axios'
import UpdateCustomer from './UpdateCustomer';
import DelectCustomer from './DelectCustomer';
// import DeleteContruction from './DeleteContruction';


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
                    setCustomer(response?.data.data)
                    return response?.data;
                } else {
                    // openErrorNotification({ title: 'Failed', message: response.data })
                    console.log(response.data)
                    return [];
                }
            });
    }
    const columns = [
        {
            title: 'លរ',
            dataIndex: 'c_id',
            key: 'c_id',
            fixed: 'left',
        },
        {
            title: 'ID',
            dataIndex: 'customerId',
            key: 'customerId',
            fixed: 'left'
        },
        {
            title: 'ឈ្មោះអតិថិជន',
            dataIndex: 'customerName',
            key: 'customerName',
            fixed: 'left'
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
                        id={record.c_id}
                        constructionName={record.constructionName}
                        customerName={record.customerName}
                        tel={record.tel}
                        gender={record.gender}
                        maritalStatus={record.maritalStatus}
                        partnerName={record.partnerName}
                        partnerGender={record.partnerGender}
                        taskType={record.taskType}
                        constructionType={record.constructionType}
                        constructionLocation={record.constructionLocation}
                        countFloor={record.countFloor}
                        mapLink={record.mapLink}
                        priority={record.priority}
                        showInDashboard={record.showInDashboard}
                        startDate={record.startDate}
                        endDate={record.endDate}
                        remark={record.remark}
                    />
                    <DelectCustomer id={record.c_id} />
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={customer}
            scroll={{ x: 2200 }}
            loading={loading}
            style={{ marginTop: "20px" }}
        />
    )
}
