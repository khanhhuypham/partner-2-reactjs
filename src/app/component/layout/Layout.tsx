import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTE_LINK } from "../../routes/route-link";


import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setBreadcrumb, sidebarSelector } from "../../store/sideBar/sidebarSlice";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem => {
    return { key, icon, children, label } as MenuItem;
}

const topItems: MenuItem[] = [
    getItem(<NavLink to={ROUTE_LINK.DASHBOARD}>Dashboard</NavLink>, "Dashboard", <PieChartOutlined />),
    getItem(<NavLink to={ROUTE_LINK.DEPARTMENT}>Department</NavLink>, "Department", <DesktopOutlined />),
    getItem("Customer Management", "Customer Management", <UserOutlined />, [
        getItem(<NavLink to={ROUTE_LINK.CUSTOMER_LIST}>Customer List</NavLink>, "Customer Management / Customer List"),
        getItem(<NavLink to={ROUTE_LINK.FILE_MANAGEMENT}>File Management</NavLink>, "Customer Management / File Management"),
    ]),
    getItem("Employee Management", "Employee Management", <UserOutlined />, [
        getItem(<NavLink to={ROUTE_LINK.EMPLOYEE_LIST}>Employee List</NavLink>, "Employee Management / Employee List"),
        getItem(<NavLink to={ROUTE_LINK.TRACKING_DIARY}>Tracking Diary</NavLink>, "Employee Management / Tracking Diary"),
        getItem(<NavLink to={ROUTE_LINK.RANKING_DASHBOARD}>Ranking Dashboard</NavLink>, "Employee Management / Ranking Dashboard"),
    ]),
    getItem("Campaign Management", "Campaign Management", <TeamOutlined />, [
        getItem(<NavLink to={ROUTE_LINK.CAMPAIGN_CHART}>Chart</NavLink>, "Campaign Management / Chart"),
        getItem("Team 2", "9"),
    ]),
    getItem(<NavLink to="/about">About</NavLink>, "about", <FileOutlined />),
];

const btmItems: MenuItem[] = [
    getItem(<NavLink to={ROUTE_LINK.LOGIN}>Login</NavLink>, "1", <i className="fa-solid fa-right-from-bracket"></i>),
];




export const CustomLayout: React.FC = () => {
    
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();
    const sideBarSlice = useAppSelector(sidebarSelector);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                // className="flex flex-col "
            >
                <div>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={topItems}
                        onClick={(e) => {
                            dispatch(setBreadcrumb(e.key))
                        }}
                    />
                </div>


                <div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={btmItems}
                    />
                </div>
            </Sider>
            <Layout>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Header style={{ padding: 0, background: colorBgContainer }} className="h-8 flex items-center">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        // style={{
                        //     fontSize: '16px',
                        //     width: 64,
                        //     height: 64,
                        // }}
                    />
                </Header>
                <Content style={{ margin: "0 16px" }} className="space-y-5">
                    <Breadcrumb
                        items={[
                            {
                                href: '',
                                title: <HomeOutlined />,
                            },
                            {
                                title: sideBarSlice.breadcrumb,
                            },
                        ]}
                    />
                    <Outlet />

                </Content>
                <Footer style={{ textAlign: "center" }}>
                    This application {new Date().getFullYear()} Created by Phạm khánh Huy
                </Footer>
            </Layout>
        </Layout>
    );
};


