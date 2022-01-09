import React from 'react'
import { Popconfirm, message } from 'antd';
import axios from 'axios'

export default function DelectUser({ userid }) {
    const confirm = async (e) => {
        const params = new URLSearchParams();
        params.append('db_user', process.env.React_App_DB_USER);
        params.append('db_password', process.env.React_App_DB_PASSWORD);
        params.append('db', 'wwvka_vkms', process.env.React_App_DB);

        params.append('data', JSON.stringify({ u_id: userid }));

        return await axios.post(
            `${process.env.React_App_URL}/delete/deleteUserById.php`, params
        )
            .then(async function (response) {
                if (response?.data === 'success') {
                    message.success('ជោគជ័យ!');
                    setTimeout(() => window.location.reload(), 100);
                } else {
                    message.error('ការលុបជោគជ័យ!');
                }

            });
    }
    return (
        <Popconfirm
            title="តើអ្នកចង់លុប?"
            onConfirm={confirm}
            // onCancel={cancel}
            okText="យល់ព្រម"
            cancelText="មិនព្រម"
        >
            <a href="#">Delete</a>
        </Popconfirm>
    )
}
