import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import vklogo from '../../Image/vk-logo.png'
export default function Sidebar() {
    let location = useLocation();
    const [current, setCurrent] = useState('');
    const [height, setHeight] = useState()
    const handleClick = e => {
        setCurrent(e.key)
    };

    useEffect(() => {
        setCurrent(location.pathname)
    }, []);

    useEffect(() => {
        setHeight(window.innerHeight)
    }, [window.innerHeight])
    return (

        <Menu
            mode="inline"
            style={{ height: height, background: "#c8d556" }}
            className="side-bar"
            onClick={(e) => handleClick(e)}
            selectedKeys={[current]}
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
            <Menu.Item key="/unlaw_work">
                <Link to="/unlaw_work">ការងាររត់ច្បាប់</Link>
            </Menu.Item>
            <Menu.Item key="/requesting">
                <Link to="/requesting">ស្នើរសុំសម្ភារៈ</Link>
            </Menu.Item>
            <Menu.Item key="/construction">
                <Link to="/construction">តារាងការដ្ឋាន</Link>
            </Menu.Item>
            <Menu.Item key="/users">
                <Link to="/users">អ្នកប្រើប្រាស់</Link>
            </Menu.Item>
        </Menu>
    )
}
