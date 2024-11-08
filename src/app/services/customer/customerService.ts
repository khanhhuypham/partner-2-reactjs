
import { version } from "os"
import { BaseResponse } from "../../models/base-response"
import { Customer, CustomerDetail, CustomerDetailData, CustomerPage } from "../../models/customer/customer"

import axiosClient from "../configURL"
import { Pagination } from "../../models/pagination"
import { TagEntity } from "../../models/customer/tag"
import { CustomerSource } from "../../models/customer/customer-source"

export const customerService = {
    version: "v1",

    List: async (
        { pagination, tag_id, lead_source_id }:
        { pagination: Pagination, tag_id: number, lead_source_id: number }
    ) => {
        const { data } = await axiosClient(31154).get<BaseResponse<CustomerPage>>(`${customerService.version}/customers`, {
            params: {
                tag_id,
                lead_source_id,
                ...pagination
            },
        })
        return data
    },

    Detail: async (customer:Customer) => {
        const { data } = await axiosClient(31154).get<BaseResponse<CustomerDetailData>>(`${customerService.version}/customers/${customer.id}/detail`)
        return data
    },

    Update: async (customer:CustomerDetail) => {
      

        const { data } = await axiosClient(31154).post<BaseResponse<CustomerDetailData>>(`${customerService.version}/customers/${customer.id}/update`,customer)
        return data
    },

    TagList: async () => {
        const { data } = await axiosClient(31154).get<BaseResponse<TagEntity[]>>(`${customerService.version}/tag`)
        return data
    },

    CustomerSourceList: async () => {
        const { data } = await axiosClient(31154).get<BaseResponse<CustomerSource[]>>(`${customerService.version}/lead-source`)
        return data
    },





} 