import { BaseResponse } from "../../models/base-response"
import { Branch } from "../../models/branch/branch"
import axiosClient from "../configURL"

export const branchService = {
	
    List: async (status:number) => {
        const {data} = await axiosClient(31152).get<BaseResponse<Branch[]>>(`v1/branch`,{
            params: { status: status},
        })
        return data
    },

} 