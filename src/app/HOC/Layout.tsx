import React, { useEffect, useRef, useState } from "react";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import {Sidebar} from "../components/template/Sidebar";
import Header from "../components/template/Header";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toast } from "../components/alert/Alert";


export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
    // const { token: { colorBgContainer }, } = theme.useToken();
    const dispatch = useDispatch()
    const refContainer = useRef()
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const logout = () => {
        // localStorageService.remove()
        // window.location.href = `${SIGN_IN}`
    }
    useEffect(() => {
        // if (refContainer.current) {
        //     setDimensions({
        //         width: refContainer.current.offsetWidth,
        //         height: refContainer.current.offsetHeight
        //     })
        // }
        // projectService.getProjectCategory().then((res) => {
        //     dispatch(setProjectCategory(res.data.content))
        // })
    }, [children])
    
    return (

        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
                <Header />
                <Sidebar />
                {/* <Toast/> */}
                <Outlet />
            </Box>
        </CssVarsProvider>

    );
}
