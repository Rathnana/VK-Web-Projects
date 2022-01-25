import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import vklogo from '../../Image/vk-logo.png'
import { keyMenu } from './NavKey';

const { Sider } = Layout;
export default function Sidebar() {
    const [current, setCurrent] = useState('');
    const [height, setHeight] = useState()
    const urlPath = useLocation().pathname

    const handleClick = e => {
        setCurrent(e.key)
    };

    return (

        <Sider
            trigger={null}
            collapsible
            style={{ background: "#c8d556" }}
            // collapsed={collapsed}
            className="side-custom"
            theme='light'
        >
            <Menu
                mode="inline"
                style={{ background: "#c8d556",height:'100%' }}
                className="side-bar"
                onClick={(e) => handleClick(e)}
                selectedKeys={[keyMenu(urlPath)]}
            >

                <Link to="/">
                    <img

                        style={{
                            width: "80%",
                            marginTop: "30px",
                            marginLeft: "10px",
                            marginBottom: "30px"
                        }}
                        src={vklogo} />
                </Link>
                <Menu.Item key="/">
                    <Link to="/">ព័ត៌មានសរុប</Link>
                </Menu.Item>
                <Menu.Item key="/report">
                    <Link to="/report">របាយការណ៍</Link>
                </Menu.Item>
                <Menu.Item key="/customer">
                    <Link to="/customer">អតិថិជន</Link>
                </Menu.Item>
                <Menu.Item key="/pretty_cash">
                    <Link to="/pretty_cash">តារាង Petty Cash</Link>
                </Menu.Item>
                <Menu.Item key="/requesting">
                    <Link to="/requesting">ស្នើរសុំសម្ភារៈ</Link>
                </Menu.Item>
                <Menu.Item key="/users">
                    <Link to="/users">អ្នកប្រើប្រាស់</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
