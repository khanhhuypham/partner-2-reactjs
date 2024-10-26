import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import './App.css';
import { useEffect, useState } from 'react'

import LoginForm from './app/pages/login';
// import { ToastContainer } from 'react-toastify';

import { Layout } from './app/HOC/Layout';
import { Order } from './app/pages/Order/Order';
import { Chat } from './app/pages/Chat/Chat';
import { MyProfile } from './app/pages/Profile/Profile';
import { Login } from './app/pages/Login/LoginForm';
import { DepartmentPage } from './app/pages/Department/DepartmentPage';
import { Toast } from './app/components/alert/Alert';
import useMountTransition from './app/components/alert/UseMountTransition';
import {  useAppSelector } from './app/hooks/useRedux';
import { notificationSelector } from './app/store/notification/notificationSlice';




function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')


    const notificationSlice = useAppSelector(notificationSelector);

    const hasTransitionedIn = useMountTransition(notificationSlice.show, 500);

    return (
        <div className="App">

            <div style={{ position: "absolute", top: 50, right: 20, zIndex: 999, width: 350 }} >
                {
                    (
                        <div className={`notifi ${hasTransitionedIn && "in"} ${notificationSlice.show && "visible"}`}>
                            <Toast />
                        </div>
                    )
                }
            </div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/" element={<Layout />}>

                        <Route path="/department" element={<DepartmentPage />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route index path="/profile" element={<MyProfile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* <ToastContainer/> */}
        </div>
    )
}
export default App;
