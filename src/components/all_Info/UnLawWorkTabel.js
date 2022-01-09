import React from 'react'
import { Table, Tag, Space } from 'antd';
const columns = [
    {
        title: 'អតិថិជន',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'ការងារ',
        dataIndex: 'job',
        key: 'job',
    },
    {
        title: 'ថ្ងៃចាប់ផ្ដើម',
        dataIndex: 'startdate',
        key: 'startdate',
    },
    {
        title: 'ស្ថានភាព',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'ផ្សេងៗ',
        dataIndex: 'other',
        key: 'other',
    },
    {
        // title,
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>សស</a>
            </Space>
        ),
    },

];

const data = [
    {
        key: '1',
        name: 'សាត គង់',
        job: 'រត់ច្បាប់',
        startdate: '17/02/21',
        status: 'មិនទាន់រួច',
        other: 'នៅឃុំ'
    },
    {
        key: '2',
        name: 'សាត គង់',
        job: 'រត់ច្បាប់',
        startdate: '17/02/21',
        status: 'មិនទាន់រួច',
        other: 'នៅឃុំ'
    },
    {
        key: '3',
        name: 'សាត គង់',
        job: 'រត់ច្បាប់',
        startdate: '17/02/21',
        status: 'មិនទាន់រួច',
        other: 'នៅឃុំ'
    }
    ,
    {
        key: '4',
        name: 'សាត គង់',
        job: 'រត់ច្បាប់',
        startdate: '17/02/21',
        status: 'មិនទាន់រួច',
        other: 'នៅឃុំ'
    }

];
export default function UnLawWorkTabel() {
    return (
        <Table
            size="middle"
            columns={columns}
            dataSource={data}
            pagination={false}
            className='Info-table'
        />
    )
}
