import React from 'react'
import { Button } from 'antd';
import { AiOutlineDelete } from "react-icons/ai";
import { Popconfirm, message } from 'antd';
import axios from 'axios'

export default function DelectCustomer({ setSuccess, id }) {
    const text = 'តើអ្នកចង់លុបរមែនទេ?';
    const confirm = async (e) => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', process.env.React_App_DB);

        params.append('data', JSON.stringify({ c_id: id }));

        return await axios.post(
            `${process.env.React_App_URL}/delete/deleteCustomerById.php`, params
        )
            .then(async function (response) {
                if (response?.data === 'success') {
                    message.success('ជោគជ័យ!');
                    setSuccess(true)
                    // setTimeout(() => window.location.reload(), 100);
                } else {
                    message.error('លុបមិនជោគជ័យ!');
                }

            });
    }
    return (
        <Popconfirm placement="topLeft" title={text} onConfirm={confirm} okText="ព្រម" cancelText="មិនព្រម">
            <Button type="primary" shape="circle" icon={<AiOutlineDelete style={{ marginTop: '5px' }} />} size='middle' danger />

        </Popconfirm>
    )
}
