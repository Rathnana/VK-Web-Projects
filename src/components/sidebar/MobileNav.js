import React, { useState, useEffect } from 'react';
import { Drawer, Button, Space, Affix } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import vklogo from '../../Image/vk-logo.png'
import { AiOutlineMenuFold } from "react-icons/ai";
import { keyMenu } from './NavKey';

export default function MobileNav() {
    const [visible, setVisible] = useState(false);
    const urlPath = useLocation().pathname

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const [current, setCurrent] = useState('');
    const handleClick = e => {
        setCurrent(e.key)
    };


    return (
        <div style={{
            position: "absolute",
            zIndex: 100
        }}>
            <Affix offsetTop={20} >
                <Button
                    type="primary"
                    onClick={showDrawer}
                    style={{
                        width: "70px",
                        height:'50px',
                        paddingTop: "10px",
                        // zIndex:10000
                    }}
                >
                    <AiOutlineMenuFold style={{ fontSize: 25}} />
                </Button>
            </Affix>
            <Drawer
                // title="Drawer with extra actions"
                placement="left"
                width={300}
                onClose={onClose}
                visible={visible}
                className="drawer-phone"
            >
                <Menu
                    mode="inline"
                    className="side-bar"
                    style={{ background: "rgb(180 217 255)", border: 'none' }}
                    onClick={(e) => handleClick(e)}
                    selectedKeys={[keyMenu(urlPath)]}
                >

                    <Link onClick={onClose} to="/">
                        <img

                            style={{
                                width: "80%",
                                marginTop: "30px",
                                marginLeft: "10px",
                                marginBottom: "30px"
                            }}
                            src={vklogo} />
                    </Link>
                    <Menu.Item key="/" onClick={onClose}>
                        <Link to="/">ព័ត៌មានសរុប</Link>
                    </Menu.Item>
                    <Menu.Item key="/report" onClick={onClose}>
                        <Link to="/report">របាយការណ៍</Link>
                    </Menu.Item>
                    <Menu.Item key="/customer" onClick={onClose}>
                        <Link to="/customer">អតិថិជន</Link>
                    </Menu.Item>
                    <Menu.Item key="/requesting" onClick={onClose}>
                        <Link to="/requesting">ស្នើរសុំសម្ភារៈ</Link>
                    </Menu.Item>
                    <Menu.Item key="/pretty_cash" onClick={onClose}>
                        <Link to="/pretty_cash">តារាង Petty Cash</Link>
                    </Menu.Item>
                    <Menu.Item key="/users" onClick={onClose}>
                        <Link to="/users">អ្នកប្រើប្រាស់</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </div>
    )
}
