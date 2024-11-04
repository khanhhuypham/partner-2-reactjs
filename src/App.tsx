
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import './App.css';
import { useEffect, useState } from 'react'

import { CustomLayout } from './app/component/layout/Layout';
import { Home } from './app/page/home/Home';
import { DepartmentPage } from './app/page/department/Department';
import { About } from './app/page/about/About';
import { ROUTE_LINK } from './app/routes/route-link';
import { Login } from './app/page/login/Login';
import { EmployeeList } from './app/page/employee/employeeList/EmployeeList';
import { TrackingDiary } from './app/page/employee/tracking-diary/tracking-diary';
import { Dashboard } from './app/page/dashboard/Dashboard';
import { CustomerList } from './app/page/customer/customerList/customerList';



function App() {



    return (

        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_LINK.LOGIN} element={<Login/>} />
                <Route path="/" element={<CustomLayout/>}>
                    <Route path={ROUTE_LINK.DASHBOARD} element={<Dashboard/>} />

                    <Route path={ROUTE_LINK.CUSTOMER_LIST} element={<CustomerList/>} />
                    <Route path={ROUTE_LINK.FILE_MANAGEMENT} element={<CustomerList/>} />
          
                    
                    <Route path={ROUTE_LINK.DEPARTMENT} element={<DepartmentPage/>} />
                    <Route path={ROUTE_LINK.EMPLOYEE_LIST} element={<EmployeeList/>} />
                    <Route path={ROUTE_LINK.TRACKING_DIARY} element={<TrackingDiary/>}/>


                    <Route path={ROUTE_LINK.RANKING_DASHBOARD} element={<h1>RANKING_DASHBOARD</h1>} />
                
                    <Route path="/home" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
