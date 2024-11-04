

import { idText } from "typescript"
import { BaseResponse } from "../../models/base-response"
import { Department } from "../../models/department"
import axiosClient from "../configURL"
import { PersonnelList } from "../../models/personnel"


export const departmentService = {
	
    List: async () => {
        const {data} = await axiosClient().get<BaseResponse<Department[]>>(`v1/departments`,{
            params: { status: 1},
        })
        return data
    },

    Detail: async (id:number) => {
        const {data} = await axiosClient().get<BaseResponse<Department>>(`v1/departments/${id}/detail`)
        return data
    },

   
    ChangeStatus: async (id:number) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/departments/${id}/change-status`,{
            status:0
        })
        return data
    },

    Update: async (department:Department) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/departments/${department.id}/update`,{
            id:department.id,
            name:department.name,
            parent_department_id:department.parent_department_id,
            description:department.description,
            source_color:department.source_color
        })
        return data
    },

    Create: async (department:Department) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/departments/create`,{
            id:department.id,
            name:department.name,
            parent_department_id:department.parent_department_id,
            description:department.description,
            source_color:department.source_color
        })
        return data
    },

} 