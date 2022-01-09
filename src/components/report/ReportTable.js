import React from 'react'
import { Table, Tag, Space } from 'antd';
const columns = [
    {
        title: 'លរ',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'ការងារ',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'ថ្ងៃចាប់ផ្ដើម',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'ស្ថានភាព',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'ផ្សេងៗ',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: '2',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: '3',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export default function ReportTable() {
    return (
        <Table
            columns={columns}
            dataSource={data}
            style={{ marginRight: 10 }}
        />
    )
}
