import React, { SetStateAction, useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../../utils/utils";


interface MenuItem {
    key: string;
    label: string;
    icon?: React.ReactElement; // Allow optional icons
    children?: MenuItem[];
    selected?: boolean; // Add selected property
    chip?: number | string; // Add chip property
    href?: string; // Add href property
}


const items: MenuItem[] = [
    {
        key: '1',
        label: 'Home',
        icon: <HomeRoundedIcon />,
    },
    {
        key: '2',
        label: 'Dashboard',
        icon: <DashboardRoundedIcon />,
    },

    {
        key: '3',
        label: 'Order',
        icon: <ShoppingCartRoundedIcon />,
        href: "/order"
    },

    {
        key: '4',
        label: 'Tasks',
        icon: <AssignmentRoundedIcon />,
        children: [
            { key: 'g1', label: 'All tasks' },
            { key: 'g2', label: 'Backlog' },
            { key: 'g3', label: 'In progress' },
            { key: 'g4', label: 'Done' },
        ],
    },
    {
        key: '3',
        label: 'Messages',
        icon: <QuestionAnswerRoundedIcon />,
        chip: 4,
        href: "/chat"
    },

    {
        key: '4',
        label: 'Users',
        icon: <GroupRoundedIcon />,
        children: [
            { key: 'user-tab-1', label: 'My profile', href: "/profile" },
            { key: 'user-tab-2', label: 'Create a new user' },
            { key: 'user-tab-3', label: 'Roles & permissions' }
        ],
    }

];


export const Sidebar = () => {


    const SideBarHeader = () => {
        return (
            <>
                <GlobalStyles
                    styles={(theme) => ({
                        ":root": {
                            "--Sidebar-width": "220px",
                            [theme.breakpoints.up("lg")]: {
                                "--Sidebar-width": "240px",
                            },
                        },
                    })}
                />
                <Box
                    className="Sidebar-overlay"
                    sx={{
                        position: "fixed",
                        zIndex: 9998,
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        opacity: "var(--SideNavigation-slideIn)",
                        backgroundColor: "var(--joy-palette-background-backdrop)",
                        transition: "opacity 0.4s",
                        transform: {
                            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
                            lg: "translateX(-100%)",
                        },
                    }}
                    onClick={() => closeSidebar()}
                />

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton variant="soft" color="primary" size="sm">
                        <BrightnessAutoRoundedIcon />
                    </IconButton>
                    <Typography level="title-lg">Acme Co.</Typography>
                    <ColorSchemeToggle sx={{ ml: "auto" }} />
                </Box>

                <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
            </>
        )
    };

    const renderMenuItem = (item: MenuItem) => {

        const toggle = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => (

            <ListItemButton onClick={() => {

                if (item.children != null) {
                    setOpen(!open)
                }
            }}

                component="a"
                href={item.href} // Handle cases without href
                selected={item.selected} // Use the selected prop

            >

                {item.icon}
                <ListItemContent>
                    <Typography level="title-sm">{item.label}</Typography>
                </ListItemContent>
                {item.chip && (
                    <Chip size="sm" color="primary" variant="solid">
                        {item.chip}
                    </Chip>
                )}

                {item.children && <KeyboardArrowDownIcon sx={[open ? { transform: "rotate(180deg)" } : { transform: "none" }]} />}

            </ListItemButton>
        );

        return (

            <ListItem nested>
                <Toggler renderToggle={toggle}>
                    <List sx={{ gap: 0.5 }}>
                        {item.children && item.children.map((child) => (
                            <ListItem>
                                <ListItemButton
                                    role="menuitem"
                                    component="a"
                                    href={child.href || "#"}
                                >
                                    {child.label}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Toggler>
            </ListItem>
        )
    };

    const RenderSettingMenu = () => {
        return (
            <List
                size="sm"
                sx={{
                    mt: 'auto',
                    flexGrow: 0,
                    '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    '--List-gap': '8px',
                    mb: 2,
                }}
            >
                <ListItem>
                    <ListItemButton>
                        <SupportRoundedIcon />
                        Support
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <SettingsRoundedIcon />
                        Settings
                    </ListItemButton>
                </ListItem>
            </List>
        )
    }

    const SideBarBtm = () => (
        <>
            <Card
                invertedColors
                variant="soft"
                color="warning"
                size="sm"
                sx={{ boxShadow: "none" }}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography level="title-sm">Used space</Typography>
                    <IconButton size="sm">
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Typography level="body-xs">
                    Your team has used 80% of your available space. Need
                    more?
                </Typography>
                <LinearProgress
                    variant="outlined"
                    value={80}
                    determinate
                    sx={{ my: 1 }}
                />
                <Button size="sm" variant="solid">
                    Upgrade plan
                </Button>
            </Card>

            <Divider />

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">Siriwat K.</Typography>
                    <Typography level="body-xs">siriwatk@test.com</Typography>
                </Box>
                {/* <IconButton size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon />
                </IconButton> */}
            </Box>
        </>
    )

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: "fixed", md: "sticky" },
                transform: {
                    xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
                    md: "none",
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 10000,
                height: "100dvh",
                width: "var(--Sidebar-width)",
                top: 0,
                p: 2,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRight: "1px solid",
                borderColor: "divider",
            }}
        >


            <SideBarHeader />

            <List size="sm" sx={
                {
                    gap: 1,
                    "--List-nestedInsetStart": "30px",
                    "--ListItem-radius": (theme) => theme.vars.radius.sm,
                }
            }>
                {items.map(renderMenuItem)}
            </List>

            <RenderSettingMenu/>

            <SideBarBtm />

        </Sheet>
    );
    
}



const Toggler = ({
    defaultExpanded = false,
    renderToggle,
    children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<SetStateAction<boolean>>;
    }) => React.ReactNode;
}) => {
    const [open, setOpen] = useState(defaultExpanded);

    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={[
                    {
                        display: "grid",
                        transition: "0.2s ease",
                        "& > *": {
                            overflow: "hidden",
                        },
                    },
                    open
                        ? { gridTemplateRows: "1fr" }
                        : { gridTemplateRows: "0fr" },
                ]}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}
