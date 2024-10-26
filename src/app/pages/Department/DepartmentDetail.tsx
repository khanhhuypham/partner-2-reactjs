import { useState, useEffect } from "react";
import { departmentService } from "../../services/department/departmentService";
import { Department } from "../../models/department";
import Input from "@mui/joy/Input";
import Table from '@mui/joy/Table';
import { Personnel } from "../../models/personnel";
import SearchIcon from "@mui/icons-material/Search";
import { containsDiacritics } from "../../utils/utils";



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


        return (
            <Table size="md" color="neutral" borderAxis="x" stickyHeader >
                <thead>
                    <tr>
                        <th style={{ width: 50,color: "#153B65"}}>STT</th>
                        <th style={{ width: 100,color: "#153B65"}}>Id</th>
                        <th style={{color: "#153B65"}}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personels.map((personel,i) => {
                            let topBorder = "" 
            
                            return (
                                <tr className="font-medium">
                                    <td>{i + 1}</td>
                                    <td>{"#NV" + personel.id}</td>
                                    <td>{personel.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        );
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
                        <span className="bg-orange_100 text-orange_primary rounded-full p-2 text-sm">{department?.users.length}</span>
                    </div>

                    <Input
                        size="sm"
                        placeholder="Search"
                        startDecorator={<SearchIcon />}
                        onChange={(event) => {

                            let keySearch = event.target.value.toLowerCase()

                            if (keySearch === "") {
                                setPersonels(department.users)
                            } else {
                                const departmentsFilter = department.users.filter((item) => {
                                    let name = item.name.toLowerCase()

                                    if (!containsDiacritics(keySearch)) {
                                        name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                        keySearch = keySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    }

                                    console.log(keySearch)
                                    console.log(name)

                                    return name.includes(keySearch);
                                })
                                setPersonels(departmentsFilter)
                            }

                        }
                        }
                    />
                     <div style={{ height: 300, overflow: 'auto' }}>
                         <EmployeeTable/>
                     </div>
                    
                </div>
            </div>
        </div>
    )


}