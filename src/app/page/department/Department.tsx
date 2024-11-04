import { useEffect, useState } from "react";
import { Department } from "../../models/department";
import { useAppDispatch } from "../../hooks/useRedux";
import { departmentService } from "../../services/department/departmentService";
import { Avatar, Button, GetProp, Input, message, Modal, Space, Table, TableProps, Tag, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Personnel } from "../../models/personnel";
import { DepartmentDetail } from "./DepartmentDetail";
import { CreateDepartment } from "./DepartmentCreate";
import { containsDiacritics } from "../../utils/utils";
import { ContentOfModalConfirm } from "../../component/modal/ModalConfirm";

export const DepartmentPage = () => {
    const [fullData, setFullData] = useState<Department[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const columns: TableProps<Department>['columns'] = [
        {
            title: 'Order',
            dataIndex: '',
            key: '',
            render: (id, _, index) => <span>{index + 1}</span>,
        },

        {
            title: 'Department Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Senior',
            dataIndex: 'parent_department_name',
            key: 'parent_department_name',
        },
        {
            title: 'Total members',
            key: 'users',
            dataIndex: 'users',
            render: (i, { users }) => {


                return (
                    <Tooltip placement="right" title={toolTipTable(users)} arrow={false} color="white">
                        <Tag color="green" key={i}>{users.length}</Tag>
                    </Tooltip>
                )
            }
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated Date',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">

                    <Button onClick={() => {
                        let component = <DepartmentDetail id={record?.id ?? 0} />
                        setDialog([true, component])
                    }} type="text">
                        <i className="fa-solid fa-eye"></i>
                    </Button>

                    <Button onClick={() => showModalCreate(record)} type="text">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>

                    <Button type="text" danger onClick={() => showModalConfirm(record)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </Space>
            ),
        },
    ];

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let keySearch = e.target.value.toLowerCase()
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

    const fetchData = () => {
        departmentService.List().then((res) => {
            setDepartments(res.data);
            setFullData(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const showModalCreate = (data: Department) => {

        let component = <CreateDepartment
            department={data}
            departmentList={fullData}
            onConfirm={() => {
                fetchData()
                setDialog([false, undefined])
            }}
            onClose={() => setDialog([false, undefined])}
        />
        setDialog([true, component])
    }

    const showModalConfirm = (data: Department) => {
        let content = <ContentOfModalConfirm
            onClose={() => { setDialog([false]); }}
            onConfirm={() => {
                departmentService.ChangeStatus(data.id).then((res) => {


                    if (res.status == 200) {
                        message.success("delete successfully")
                        fetchData()
                    } else {
                        message.error(res.message)
                    }

                    setDialog([false])

                }).catch((error) => {
                    console.log(error)
                })
            }}
            content={<p>Are you sure you want delete this department</p>}
        />
        setDialog([true, content])
    }


    useEffect(() => {
        fetchData()
    }, []);




    return (
        <>
            <div className="flex space-x-2">
                <Input placeholder="default size" className="w-48 " prefix={<i className="fa-solid fa-magnifying-glass" />} onChange={onSearch} />
                <Button
                    variant="outlined"
                    icon={<i className="fa-solid fa-plus" />}
                    className='h-max'
                    onClick={() => showModalCreate(new Department())}
                >
                    Create
                </Button>
            </div>
            <Table<Department> columns={columns} dataSource={departments} />
            <Modal
                // className="w-max"
                width={800}
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







const toolTipTable = (users: Personnel[]) => {


    const columnsOfToolTipTable: TableProps<Personnel>['columns'] = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            render: (name, _, index) => {
                return (

                    <div className="flex flex-row items-center space-x-2 ">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <span className="text-xs">{name}</span>
                    </div>
                )
            },
        },
    ];

    return (
        <Table<Personnel>
            columns={columnsOfToolTipTable}
            dataSource={users}
            size="small"
            scroll={{
                y: 200,
                x: 150
            }}
            pagination={false}
        />
    )
}