/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, Fragment, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton from "@mui/joy/IconButton";

import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import List from '@mui/joy/List';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';



import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { Department } from "../../models/department";
import { containsDiacritics, createPagination } from "../../utils/utils";
import { departmentService } from "../../services/department/departmentService";
import Tooltip from '@mui/joy/Tooltip';
import { Personnel } from "../../models/personnel";
import { DepartmentDetail } from "./DepartmentDetail";
import { ContentOfModalConfirm } from "../../components/modal/ModalConfirm";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { showErrorNotifi, showSuccessNotifi } from "../../store/notification/notificationSlice";
import { NotifiType } from "../../constant/notificationType";
import { CreateDepartment } from "./CreateDepartment";




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



export const DepartmentTable = () => {
    const [order, setOrder] = useState<Order>("desc");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const [fullData, setFullData] = useState<Department[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [limit, setLimit] = useState(10);
    const [cursor, setCursor] = useState(0);


    const dispatch = useAppDispatch();
   

    useEffect(() => {
        departmentService.List().then((res) => {
          
            

            setDepartments(res.data)
            setFullData(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    const renderFilters = () => (
        <Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                >
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Category</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="refund">Refund</Option>
                    <Option value="purchase">Purchase</Option>
                    <Option value="debit">Debit</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Customer</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="olivia">Olivia Rhye</Option>
                    <Option value="steve">Steve Hampton</Option>
                    <Option value="ciaran">Ciaran Murray</Option>
                    <Option value="marina">Marina Macdonald</Option>
                    <Option value="charles">Charles Fulton</Option>
                    <Option value="jay">Jay Hoper</Option>
                </Select>
            </FormControl>
        </Fragment>
    );

    const selectLimit = () => {
        const options: Number[] = [10, 20, 25, 50, 100]

        return (
            <div className="flex justify-start items-center space-x-2 text-sm ">
                <span>Hiển thị</span>
                <Box sx={{ width: 75 }} className="text-sm">
                    <Select
                        defaultValue={10}
                        variant="outlined"
                        size="sm"
                        value={limit}
                        onChange={(e, newValue) => {
                            setLimit(Number(newValue))
                        }}
                    >
                        {options.map((value, i) => <Option value={value}>{String(value)}</Option>)}
                    </Select>
                </Box>
                <span>/{departments.length} hạng mục</span>
            </div>
        );
    }

    


    const RowMenu = ({ data }: { data: Department }) => {
        return (
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{
                        root: { variant: "plain", color: "neutral", size: "sm" },
                    }}
                >
                    <MoreHorizRoundedIcon />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem onClick={() => {
                        setDialog([true, <DepartmentDetail id={data?.id ?? 0} />])
                    }}>View</MenuItem>

                    <MenuItem onClick={() => {
                        setDialog([true, <CreateDepartment department={data} onConfirm={() => {
                            setDialog([false])
                        }}/>])
                    }}>Edit</MenuItem>


                    <Divider />

                    <MenuItem color="danger" onClick={() => {
                        let content = <ContentOfModalConfirm
                            onClose={() => { setDialog([false]); }}
                            onConfirm={() => {
                                departmentService.ChangeStatus(data?.id ?? 0).then((res) => {
                                    
                                    res.status == 200
                                    ? dispatch(showSuccessNotifi("delete successfully"))
                                    : dispatch(showErrorNotifi(res.message))
                                    
                                    setDialog([false])

                                }).catch((error) => {
                                    console.log(error)
                                })
                            }}
                            content={"Are you sure you want delete this department"}
                        />

                        setDialog([true, content])

                    }}>
                        Delete
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    }

    return (
        <>
   

            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: "sm",
                    py: 2,
                    display: { xs: "none", sm: "flex" },
                    flexWrap: "wrap",
                    gap: 1.5,
                    "& > *": {
                        minWidth: { xs: "120px", md: "160px" },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for order</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                        onChange={(event) => {

                            let keySearch = event.target.value.toLowerCase()

                            if (keySearch === "") {
                                setDepartments(fullData)
                            } else {
                                const departmentsFilter = fullData.filter((item) => {
                                    let name = item.name.toLowerCase()

                                    if (!containsDiacritics(keySearch)) {
                                        name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                        keySearch = keySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    }

                                    console.log(keySearch)
                                    console.log(name)

                                    return name.includes(keySearch);
                                })
                                setDepartments(departmentsFilter)
                            }

                        }
                        }
                    />
                </FormControl>
                {renderFilters()}
            </Box>

            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: "none", sm: "initial" },
                    width: "100%",
                    borderRadius: "sm",
                    flexShrink: 1,
                    overflow: "auto",
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        "--TableCell-headBackground":
                            "var(--joy-palette-background-level1)",
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableRow-hoverBackground":
                            "var(--joy-palette-background-level1)",
                        "--TableCell-paddingY": "4px",
                        "--TableCell-paddingX": "8px",
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    width: 48,
                                    textAlign: "center",
                                    padding: "12px 6px",
                                }}
                            >
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length !== departments.length
                                    }
                                    checked={selected.length === departments.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked
                                                ? departments.map((department) => department.id)
                                                : []
                                        );
                                    }}
                                    color={
                                        selected.length > 0 ||
                                            selected.length === departments.length
                                            ? "primary"
                                            : undefined
                                    }
                                    sx={{ verticalAlign: "text-bottom" }}
                                />
                            </th>
                            <th style={{ width: 50, padding: "12px 6px" }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() =>
                                        setOrder(
                                            order === "asc" ? "desc" : "asc"
                                        )
                                    }
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={[
                                        {
                                            fontWeight: "lg",
                                            "& svg": {
                                                transition: "0.2s",
                                                transform:
                                                    order === "desc"
                                                        ? "rotate(0deg)"
                                                        : "rotate(180deg)",
                                            },
                                        },
                                        order === "desc"
                                            ? {
                                                "& svg": {
                                                    transform: "rotate(0deg)",
                                                },
                                            }
                                            : {
                                                "& svg": {
                                                    transform:
                                                        "rotate(180deg)",
                                                },
                                            },
                                    ]}
                                >
                                    STT
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                Department Name
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                Senior
                            </th>
                            <th style={{ width: 80, padding: "12px 6px" }}>
                                Total members
                            </th>

                            <th style={{ width: 120, padding: "12px 6px" }}>
                                created Date
                            </th>

                            <th style={{ width: 120, padding: "12px 6px" }}>
                                Updated Date
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {[...departments.slice(cursor, cursor + limit)]
                            .sort(getComparator(order, "id"))
                            .map((department, index) => (
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "center",
                                            width: 120,
                                        }}
                                    >
                                        <Checkbox
                                            size="sm"
                                            checked={selected.includes(department.id)}
                                            color={
                                                selected.includes(department.id)
                                                    ? "primary"
                                                    : undefined
                                            }
                                            onChange={(event) => {
                                                setSelected((ids) =>
                                                    event.target.checked
                                                        ? ids.concat(department.id)
                                                        : ids.filter((itemId) => itemId !== department.id)
                                                );
                                            }}
                                            slotProps={{
                                                checkbox: {
                                                    sx: { textAlign: "left" },
                                                },
                                            }}
                                            sx={{
                                                verticalAlign: "text-bottom",
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {department.id}
                                    </td>
                                    <td>
                                        {department.name}
                                    </td>
                                    <td>
                                        {department.parent_department_name}
                                    </td>
                                    <td>

                                        <Box sx={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
                                            <Tooltip title={<ListOfToolTip personnels={department.users} />} variant="outlined" placement="right-start">
                                                <Button variant="outlined"> {department.users.length}</Button>
                                            </Tooltip>
                                        </Box>

                                    </td>
                                    <td>
                                        {department.created_at}
                                    </td>
                                    <td>
                                        {department.updated_at}
                                    </td>

                                    <td>
                                        <RowMenu data={department} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Sheet>

            {selectLimit()}

            <div className="flex justify-between">

                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}

                    onClick={() => {
                        setCursor((cursor - limit) <= 0 ? 0 : (cursor - limit))
                    }}
                >
                    Previous
                </Button>


                <div className="space-x-2">

                    {createPagination(1, Math.ceil(departments.length / limit)).map((page) => (
                        <IconButton
                            key={page}
                            size="sm"
                            variant={Number(page) - 1 == Number(cursor / limit) ? "solid" : "outlined"}
                            color="neutral"

                            onClick={() => {
                                setCursor((Number(page) - 1) * limit)
                            }}
                        >
                            {page}
                        </IconButton>
                    ))}

                </div>


                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() => {
                        setCursor((cursor + limit) >= departments.length ? cursor : (cursor + limit))
                    }}
                >
                    Next
                </Button>
            </div>


            <Modal open={dialog[0]} onClose={() => setDialog([false, undefined])}>
                <ModalDialog>
                    {dialog[1]}
                </ModalDialog>
            </Modal>
        </>
    );
}


const ListOfToolTip = ({ personnels }: { personnels: Personnel[] }) => {

    console.log(personnels)

    return (
        <Sheet
            variant="outlined"
            sx={{ width: 230, maxHeight: 300, overflow: 'auto', borderRadius: 'sm' }}
        >
            <List >
                {personnels.map((value, _) => (
                    <>
                        <ListItem>

                            <div className="flex flex-row items-center space-x-2 ">
                                <Avatar size="sm" alt="Remy Sharp" src={""} />
                                <span className="text-xs">{value.name}</span>
                            </div>

                        </ListItem>
                        <ListDivider inset="startContent" />
                    </>
                ))}

            </List>
        </Sheet>
    )
}


