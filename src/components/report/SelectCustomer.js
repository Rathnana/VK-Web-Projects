import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select } from 'antd'

const { Option } = Select;

export function SelectCustomer({ title, value, setValue, disabled }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            let data = await getCustomerConstruction()
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    const options = data?.map(d => <Option value={d?.c_id} key={d.c_id}>{d?.constructionName}</Option>);

    return (
        <Select
            showSearch
            size="large"
            placeholder={title}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            value={loading ? null : value}
            onChange={(e) => setValue(e)}
            disabled={disabled}
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.indexOf(input) >= 0
            }
            filterSort={(optionA, optionB) =>
                optionA.children.localeCompare(optionB.children)
            }
            loading={loading}
        >
            {options}
        </Select>
    )
}

const getCustomerConstruction = async () => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    return await axios.post(
        `${process.env.React_App_URL}/get/getCustomerConstruction.php`, params
    )
        .then(async function (response) {
            if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                return response?.data;
            } else {
                return [];
            }
        });
}