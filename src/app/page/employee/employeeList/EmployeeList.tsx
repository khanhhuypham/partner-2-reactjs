
import React, { useEffect, useRef, useState } from 'react';
import type { PaginationProps, TableProps } from 'antd';
import { Avatar, Button, Input, message, Modal, Pagination, Select, Space, Table, Tabs, Tag, Tooltip } from 'antd';
import { AndroidOutlined, AppleOutlined, UserOutlined } from '@ant-design/icons';
import { userService } from '../../../services/user/userService';
import { Pagination as pageModel } from '../../../models/pagination';
import { User } from '../../../models/user/user';
import { Branch } from '../../../models/branch/branch';
import { user_status } from '../../../constants/enum';
import { UserPage } from '../../../models/user/userPage';
import { Department } from '../../../models/department';
import { departmentService } from '../../../services/department/departmentService';
import { branchService } from '../../../services/branch/branchService';
import { useDebounce } from '../../../utils/utils';
import { CreateEmployee } from './CreateEmployee';
import { ContentOfModalConfirm } from '../../../component/modal/ModalConfirm';
import { contentOfResetPwdModal, contentOfSuccessfullCreateUser } from './ContentOfModal';


type ColumnsType<T extends object = object> = TableProps<T>['columns'];

enum modalType {
    resetPwd = 1,
    createEmployeeSuccess = 2,
}


export const EmployeeList: React.FC = () => {
    
    const [data, setData] = useState<UserPage>();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const [parameter, setParameter] = useState({
        pagination: { ...(new pageModel()), limit: 10, page: 1 },
        branch_id: -1,
        department_id: -1,
        status: -1
    });

    const debounceValue = useDebounce(parameter.pagination.key_search, 800);

    const fetchData = () => {

        setLoading(true);

        userService.List(parameter).then((res) => {

            setLoading(false);

            if (res.status == 200) {
                setData(res.data)
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    const resetPassword = (user: User) => {

        userService.ResetPassword(user).then((res) => {
            if (res.status == 200) {

                message.success("Reset password successfully")
                fetchData()
            } else {
                message.error(res.message)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const changeUserStatus = (user: User) => {

        setLoading(true);

        userService.ChangeStatus(user).then((res) => {

            if (res.status == 200) {
                setLoading(true);
                fetchData()
            } else {
                message.error(res.message)
            }
            setLoading(false);

        }).catch((error) => {
            console.log(error);
        });
    };

    const columns: ColumnsType<User> = [
        {
            title: 'Order',
            dataIndex: '',
            render: (record, _, index) => index + 1,
            width: 30,
        },

        {
            title: 'Code',
            dataIndex: 'id',
            render: (text) => `NV${text}`,
            width: 60,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => (
                <div className="space-x-1">
                    <Avatar src="" shape="circle" size={40} icon={<UserOutlined />}></Avatar>
                    <span>{text}</span>
                </div>
            ),
        },


        {
            title: 'Branches',
            dataIndex: 'branches',
            render: (i, { branches }) => {
                return (
                    <Tooltip placement="right" title={toolTipTable(branches)} arrow={false} color="white" className="space-x-2">
                        <span>{branches.at(0)?.address ?? ""}</span>
                        <Tag color="green" key={i}>{branches.length}</Tag>
                    </Tooltip>
                )
            }
        },

        {
            title: 'Department',
            dataIndex: 'department_name',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (i, { status }) => (<Tag
                color={status == user_status.ACTIVE ? "green" : "red"}
                key={i}>
                {status == user_status.ACTIVE ? "ĐANG HOẠT ĐỘNG" : "TẠM NGỪNG"}
            </Tag>
            )
        },

        {
            title: 'Action',
            dataIndex: '',
            render: (i, row) => (
                // {row.status == user_status.INACTIVE && disabled}
                <div className="">

                    <Tooltip title={<span className='text-black'>Reset Password</span>} color="white">
                        <Button
                            type="text"
                            disabled={row.status == user_status.INACTIVE && true}
                            icon={<i className="fa-solid fa-lock"></i>}
                            onClick={() => showModalConfirm(row, modalType.resetPwd)}
                        />

                    </Tooltip>

                    <Button
                        type="text"
                        disabled={row.status == user_status.INACTIVE && true}
                    >
                        <i className="fa-solid fa-eye"></i>
                    </Button>

                    <Button
                        type="text"
                        disabled={row.status == user_status.INACTIVE && true}
                    >
                        <i className="fa-solid fa-location-dot"></i>
                    </Button>

                    <Button type="text"
                        disabled={row.status == user_status.INACTIVE && true}
                        onClick={() => showModalCreate(row)}
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>


                    <Tooltip title={<span className='text-black'>Restore</span>} color="white">
                        <Button
                            type="text"
                            onClick={() => changeUserStatus(row)}
                            icon={<i className="fa-solid fa-arrows-rotate"></i>}
                        />
                    </Tooltip>

                </div>
            )
        },

    ];                      

    const onPageChange: PaginationProps['onChange'] = (page) => {
        let p = { ...parameter.pagination, page: page }
        setParameter({ ...parameter, pagination: p });
    };


    useEffect(fetchData, [
        parameter.pagination.page,
        parameter.branch_id,
        parameter.department_id,
        parameter.status,
        debounceValue
    ]);

    useEffect(() => {
        departmentService.List().then((res) => {
            if (res.status == 200) {
                setDepartments(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });


        branchService.List(1).then((res) => {

            if (res.status == 200) {
                setBranches(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });


    }, []);


    const showModalCreate = (data: User) => {
        let component = <CreateEmployee user={data} departments={departments} branches={branches}
            onConfirm={(user) => {
                if (user.id > 0) {
                    fetchData()
                    setDialog([false])
                } else {
                    showModalConfirm(user, modalType.createEmployeeSuccess)
                }
            }}
        />
        setDialog([true, component])
    }



    const showModalConfirm = (data: User, type: modalType) => {

        let component = undefined

        switch (type) {
            case modalType.createEmployeeSuccess: {
                component = contentOfSuccessfullCreateUser({
                    data: data,
                    onClose: () => { setDialog([false]) },
                    onConfirm: () => {
                        fetchData()
                        setDialog([false])
                    }
                })
                break;
            }
            case modalType.resetPwd: {
                component = contentOfResetPwdModal({
                    data: data,
                    onClose: () => { setDialog([false]) },
                    onConfirm: () => {
                        resetPassword(data)
                        setDialog([false])
                    }
                })
                break;
            }
            default: {
                //statements; 
                break;
            }
        }

        setDialog([true, component])
    }


    const header = () => {
        return (
            <div>
                <div className="flex justify-between">
                    <Tabs
                        defaultActiveKey="-1"
                        color="orange"
                        items={[{ text: "Tất cả", value: -1 }, { text: "Đang hoạt động", value: 1 }, { text: "Tạm ngưng", value: 2 }].map((element, i) => {
                            return {
                                key: element.value.toString(),
                                label: (
                                    <div className="space-x-2">
                                        <span>{element.text}</span>
                                        <span className='text-[11px] p-1 bg-slate-200 rounded-full'>99+</span>
                                    </div>
                                ),
                            };
                        })}

                        onChange={(value) => {
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, status: Number(value), pagination: p })
                        }}
                    />

                    <div className="space-x-2">
                        <Button color="default" variant="solid" className="text-base">
                            Set tracking position
                        </Button>


                        <Button type="primary" icon={<i className="fa-solid fa-gear"></i>} className="text-base">
                            <span>Change Department</span>
                        </Button>

                        <Button
                            color="danger"
                            variant="solid"
                            icon={<i className="fa-solid fa-plus"></i>}
                            className="text-base"
                            onClick={() => showModalCreate(new User())}
                        >
                            Add
                        </Button>

                    </div>
                </div>
                <div className="flex space-x-2">


                    <Input
                        placeholder="default size"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {


                            let p = { ...parameter.pagination, key_search: e.target.value ?? "", page: 1 }
                            setParameter({ ...parameter, pagination: p })
                        }}
                    />

                    <Select
                        placeholder={<span className='text-black'>All branches</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            console.log(value)
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, branch_id: Number(value ?? -1), pagination: p })

                        }}

                        options={branches.map((d) => ({ label: d.name, value: d.id }))}
                    />

                    <Select
                        placeholder={<span className='text-black'>All departments</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, department_id: Number(value ?? -1), pagination: p })
                        }}
                        options={departments.map((b) => ({ label: b.name, value: b.id }))}
                    />
                </div>

            </div>
        )
    };

    return (
        <>
            {header()}

            <Table<User>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data?.list}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={parameter.pagination.page} onChange={onPageChange} total={data?.total_record} />}
            />


            <Modal

                centered
                open={dialog[0]}
                onCancel={() => setDialog([false, undefined])}
                footer={<></>}
            >
                {dialog[1] ?? <></>}
            </Modal>
        </>
    );
};

const toolTipTable = (branches: Branch[]) => {


    const columnsOfToolTipTable: TableProps<Branch>['columns'] = [
        {
            title: '',
            dataIndex: 'address',
            key: 'address',
            render: (address, _, index) => <span className="text-xs">{address}</span>,
        },
    ];

    return (
        <Table<Branch>
            columns={columnsOfToolTipTable}
            dataSource={branches}
            size="small"
            showHeader={false}
            pagination={false}
        />
    )
}

