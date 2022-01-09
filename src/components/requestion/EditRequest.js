import React, { useState } from 'react'
import { Modal, Select, Input, message } from 'antd';
import { Button } from 'antd';
import { AiOutlineEdit } from "react-icons/ai";

export default function EditRequest() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>

            <Button onClick={showModal} type="primary" shape="circle" icon={<AiOutlineEdit style={{ marginTop: '5px' }} />} size='middle' />

            <Modal
                title="បន្ថែមអ្នកប្រើប្រាស់"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                {/* <p>ឈ្មោះអ្នកប្រើប្រាស់</p>
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
                </Select> */}
            </Modal>
        </div>

    )
}
