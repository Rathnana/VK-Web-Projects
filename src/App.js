import './App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Headers from './components/header/Header'
import 'antd/dist/antd.css';
import { Divider, Layout } from 'antd';
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
  const [isMobile, setIsMobile] = useState(false)


  const [user, setUser] = useState(false)
  const [auth, setAuth] = useState(getuser !== null && getuser !== undefined ? true : false);
  const [search, setSearch] = useState();
  useEffect(() => {

    if (getuser) {
      setUser(true)
      setAuth(false)
    } else {
      setUser(false)
      setAuth(false)
    }
  }, [auth])

  const handleResize = () => {
    if (window.innerWidth <= 992) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  window.addEventListener('resize', handleResize)

  useEffect(() => {
    getUser()
  }, [])

  return user ? (
    <Layout style={{ minHeight: '100vh' }}>

      {
        isMobile ? <MobileNav /> : <Sidebar />
      }


      <Layout className="site-layout" >
        <Headers setAuth={setAuth} setSearch={setSearch} />
        <Divider />

        <Routes>
          <Route path="/" element={<AllInfo />} />
          <Route path="/report" element={<Report />} />
          <Route path="/requesting" element={<Requestion />} />
          <Route path="/customer" element={<Customer search={search} />} />
          <Route path="/pretty_cash" element={<PettyCash search={search} />} />
          <Route path="/users" element={<Users search={search} />} />
        </Routes>
      </Layout>

    </Layout>
  )
    :
    <Login setAuth={setAuth} />
    ;
}

export default App;
