

import { idText } from "typescript"
import { BaseResponse } from "../../models/base-response"
import { Department } from "../../models/department"
import axiosClient from "../configURL"

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

    DepartmentPersonnels: async () => {
        const {data} = await axiosClient().get<BaseResponse<Department[]>>(`v1/departments`,{
            params: { 
                key_search:"",
                department_id:1,
                status: 1,
                page:1,
                limit:1
            },
        })
        return data
    },


    ChangeStatus: async (id:number) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/departments/${id}/change-status`,{
            status:0
        })
        return data
    },

} 