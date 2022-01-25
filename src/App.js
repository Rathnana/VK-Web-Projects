import './App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Headers from './components/header/Header'
import 'antd/dist/antd.css'; 
import { Row, Col, Divider } from 'antd';
import AllInfo from './components/all_Info/AllInfo';
import Report from './components/report/Report';
import Users from './components/userControll/Users';
import { getUser } from './getDatabase'
import Requestion from './components/requestion/Requestion';
import Customer from './components/customer/Customer';
import MobileNav from './components/sidebar/MobileNav';
import PettyCash from './components/pettycash/PettyCash';
import Login from './components/Login/Login'

function App() {
  let getuser = sessionStorage.getItem("u_id");
  const [user, setUser] = useState(false)
  const [auth, setAuth] = useState(getuser !== null && getuser !== undefined ? true : false)
  useEffect(() => {

    if (getuser) {
      setUser(true)
      setAuth(false)
    } else {
      setUser(false)
      setAuth(false)
    }
  }, [auth])

  useEffect(() => {
    getUser()
  }, [])

  return user ? (
    <Row>
      <Col
        style={{
          position: "absolute",
          zIndex: "2"
        }}
        xs={1} sm={1} md={1} lg={0} xl={0}
      >
        <MobileNav />
      </Col>
      <Col xs={0} sm={0} md={0} lg={3} xl={3} >
        <Sidebar />
      </Col>
      <Col
        xs={24} sm={24} md={24} lg={21} xl={21}
      >
        <Headers setAuth={setAuth} />
        <Divider />

        <Routes>
          <Route path="/" element={<AllInfo />} />
          <Route path="/report" element={<Report />} />
          <Route path="/requesting" element={<Requestion />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/petty_cash" element={<PettyCash />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Col>
    </Row>

  )
    :
    <Login setAuth={setAuth} />
    ;
}

export default App;
