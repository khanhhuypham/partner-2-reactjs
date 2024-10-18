import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import './App.css';
import { useEffect, useState } from 'react'
import Wellcome from "./app/pages/welcomPage"
import LoginForm from './app/pages/login';
import { ToastContainer } from 'react-toastify';

import { Layout } from './app/HOC/Layout';
import { Order } from './app/pages/Order/Order';
import { Chat } from './app/pages/Chat/Chat';
import { MyProfile } from './app/pages/Profile/Profile';
import { Login } from './app/pages/Login/LoginForm';




function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />

                    <Route path="/" element={<Layout/>}>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/chat" element={<Chat />} />
                        <Route index path="/profile" element={<MyProfile />} />
                
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    )
}   
export default App;
