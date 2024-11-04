
import axiosClient from "../configURL"
import { BaseResponse } from "../../models/base-response"
import { User } from "../../models/user/user"
import { Pagination } from "../../models/pagination"
import { UserPage } from "../../models/user/userPage"
import { user_status } from "../../constants/enum"



export const userService = {

    Login: async (credential: {
        identifier_name: string
        device_uuid: string
        phone: string
        password: string
    }) => {
        let {data} = await axiosClient().post<BaseResponse<User>>("/v1/auth/login", credential)

        return data
    },
    Signin: (credential:{username:string,password: string}) => {
        return axiosClient().post("/signin", credential)
    },


    List: async (
        {pagination,branch_id,department_id,status}:
        {pagination:Pagination,branch_id:number,department_id:number,status:number}
    ) => {
        const {data} = await axiosClient().get<BaseResponse<UserPage>>(`v1/users`,{
            params: { 
                branch_id:branch_id,
                department_id:department_id,
                status: status,
                ...pagination
            },
        })
        return data
    },

    ChangeStatus: async (user:User) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/users/${user.id}/change-status`,{
            status:user.status == user_status.ACTIVE ? user_status.INACTIVE : user_status.ACTIVE
        })
        return data
    },

    Update: async (user:User) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`v1/users/${user.id}/update`,user)
        return data
    },

    Create: async (user:User) => {
        const {data} = await axiosClient().post<BaseResponse<User>>(`v1/users/create`,user)
        return data
    },

    ResetPassword: async (user:User) => {
        const {data} = await axiosClient().post<BaseResponse<User>>(`v1/users/${user.id}/reset-password`,user)
        return data
    }


} 