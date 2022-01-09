import React, { useState } from 'react'
import { Modal, Button, Select, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Add_New_User } from '../../getDatabase'


const { Option } = Select;
export default function AddUser() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
        role: ''
    })
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (user.username && user.password ) {
            setIsModalVisible(false);
            Add_New_User(user.username, user.password, user.role)
            setUser({
                username: '',
                password: '',
                role: ''
            })
            message.success('បង្កើតអ្នកប្រើប្រាស់ជោគជ័យ!')
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
            <Button type="primary" onClick={showModal} style={{ background: 'red' }} >
                បន្ថែម +
            </Button>
            <Modal
                title="បន្ថែមអ្នកប្រើប្រាស់"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                <p>ឈ្មោះអ្នកប្រើប្រាស់</p>
                <Input
                    defaultValue={user.username}
                    size="large"
                    placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
                    allowClear
                    style={{
                        marginTop: '-20px'
                    }}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                < br />
                < br />
                <p>ពាក្យសម្ងាត់</p>
                <Input.Password
                    defaultValue={user.password}
                    size="large"
                    placeholder="ពាក្យសម្ងាត់"
                    allowClear
                    style={{
                        marginTop: '-20px'
                    }}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                <br />
                < br />
                <p>ប្រភេទអ្នកប្រើប្រាស់</p>
                <Select
                    defaultValue="User"
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
