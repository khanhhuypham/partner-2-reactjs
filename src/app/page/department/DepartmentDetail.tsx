import { useState, useEffect } from "react";
import { departmentService } from "../../services/department/departmentService";
import { Department } from "../../models/department";

import { Personnel } from "../../models/personnel";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Table, TableProps } from "antd";



export const DepartmentDetail = ({ id }: { id: number }) => {

    const [department, setDepartment] = useState<Department>(new Department());
    const [personels, setPersonels] = useState<Personnel[]>([]);

    useEffect(() => {
        departmentService.Detail(id).then((res) => {
            setDepartment(res.data)
            setPersonels(res.data.users)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const EmployeeTable = () => {
    
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
                dataSource={personels}
                size="small"
                scroll={{
                    y: 200
                }}
                pagination={false}
            />
        )
    }


    return (
        <div className="bg-transparent space-y-4">

            <h1 className="text-center text-orange_700 text-2xl font-bold">Chi tiết bộ phận</h1>

            <div className="grid grid-cols-2 gap-x-6">

                <div className="bg-neutral_primary p-5 space-y-4 rounded">
                    <h2 className="text-orange_primary text-xl font-bold">Thông tin bộ phận</h2>
                    <div className="grid grid-cols-2 gap-4 text-base font-medium">
                        <span className="text-gray_500">Tên bộ phận:</span>
                        <span>{department?.name}</span>

                        <span className="text-gray_500">Cấp trên:</span>
                        <span>{department?.parent_department_name}</span>

                        <span className="text-gray_500">Mô tả:</span>
                        <span>{department?.description}</span>

                        <span className="text-gray_500">Màu bộ phận</span>
                        <span>
                            <div className={`rounded-md bg-[${department?.source_color}] w-10 h-10`}></div>
                        </span>

                        <span className="text-gray_500">Ngày tạo:</span>
                        <span>{department?.created_at}</span>

                        <span className="text-gray_500">Ngày cập nhật:</span>
                        <span>{department?.updated_at}</span>
                    </div>
                </div>

                <div className="bg-neutral_primary p-5 rounded space-y-2">
                    <div className="flex flex-row items-center space-x-2">
                        <h2 className="text-orange_primary text-xl font-bold">Danh sách thành viên</h2>
                        {/* <Chip label={department?.users.length} variant="outlined" size='medium' /> */}
                    </div>

                    <div style={{ overflow: 'auto' }}>
                        <EmployeeTable />
                    </div>

                </div>
            </div>
        </div>
    )


}