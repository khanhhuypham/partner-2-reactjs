import { Token } from "@mui/icons-material"
import axiosClient from "../configURL"
import { BaseResponse } from "../../models/base-response"
import { User } from "../../models/user"



export const userService = {

    Login: (credential: {
        identifier_name: string
        device_uuid: string
        phone: string
        password: string
    }) => {
        return axiosClient().post<BaseResponse<User>>("api/v1/auth/login", credential)
    },
    Signin: (credential:{username:string,password: string}) => {
        return axiosClient().post("/signin", credential)
    },


} 