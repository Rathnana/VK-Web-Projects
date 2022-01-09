import React, { useState } from 'react'
import { Modal, Select, Input, message } from 'antd';
import { Update_User } from '../../getDatabase'
const { Option } = Select;
export default function EditUser({ role, password, username, userid }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({
        username: username,
        password: password,
        role: role
    })
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        if (user.username && user.role) {
            setIsModalVisible(false);
            Update_User(user.username, user.role, userid)

            message.success('បានកែប្រែជោគជ័យ!')
            setTimeout(() => window.location.reload(), 100);
        } else {
            message.error('សូមបំពេញគ្រប់ Input Box ទាំងអស់!')
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function handleChange(value) {
        setUser({ ...user, role: value })
    }

    return (
        <div>

            <a onClick={showModal}>កែប្រែ</a>
            <Modal
                title="បន្ថែមអ្នកប្រើប្រាស់"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                <p>ឈ្មោះអ្នកប្រើប្រាស់</p>
                <Input
                    id="username"
                    defaultValue={user.username}
                    size="large"
                    placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
                    allowClear
                    style={{
                        marginTop: '-20px'
                    }}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />

                <br />
                < br />
                <p>ប្រភេទអ្នកប្រើប្រាស់</p>
                <Select
                    defaultValue={user.role}
                    size="large"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    <Option value="Admin">Admin</Option>
                    <Option value="Manangement">Manangement</Option>
                    <Option value="User">User</Option>
                </Select>
            </Modal>
        </div>
    )
}
