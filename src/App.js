import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Headers from './components/header/Header'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Row, Col, Divider } from 'antd';
import AllInfo from './components/all_Info/AllInfo';
import Report from './components/report/Report';
import Users from './components/userControll/Users';
import UnLawWork from './components/unLawWork/UnLawWork';
import { getUser } from './getDatabase'
import Requestion from './components/requestion/Requestion';
import Construction from './components/construction/Construction';
import Customer from './components/customer/Customer';
import MobileNav from './components/sidebar/MobileNav';

function App() {

  useEffect(() => {
    getUser()
  }, [])

  return (
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
        <Headers />
        <Divider /> 
        
        <Routes>
          {/* <Route path="/" element={<AllInfo />} />
          <Route path="/report" element={<Report />} />
          <Route path="/unlaw_work" element={<UnLawWork />} /> */}
          {/* <Route path="/construction" element={<Construction />} /> */}
          {/* <Route path="/requesting" element={<Requestion />} /> */}
          <Route path="/customer" element={<Customer />} />
          {/* <Route path="/users" element={<Users />} /> */}
        </Routes>
      </Col>
    </Row>
  );
}

export default App;
