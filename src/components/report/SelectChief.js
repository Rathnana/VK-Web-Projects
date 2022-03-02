import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select } from 'antd'

const { Option } = Select;

export function SelectChief({ title, value, setValue, disabled }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            let data = await getAllChief()
            setData(data?.data)
            setLoading(false)
        }
        fetchData()
    }, [])

    const options = data?.map(d => <Option value={d?.u_id} key={d.u_id}>{d?.lastName + " " + d?.firstName}</Option>);

    return (
        <Select
            showSearch
            size="large"
            placeholder={title}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
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

const getAllChief = async () => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    return await axios.post(
        `${process.env.React_App_URL}/get/getAllChief.php`, params
    )
        .then(async function (response) {
            if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                return response?.data;
            } else {
                return [];
            }
        });
}
