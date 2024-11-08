import React, { useEffect, useState } from 'react';
import type { CascaderProps, SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
    Avatar,
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    message,
    Select,
    Tag,
    Upload,
} from 'antd';

import { DATE_FORMAT } from '../../../constants/constant';
import { GENDER } from '../../../constants/enum';

import { Customer, CustomerDetail } from '../../../models/customer/customer';
import { TagEntity } from '../../../models/customer/tag';
import { CustomerSource } from '../../../models/customer/customer-source';
import { customerService } from '../../../services/customer/customerService';
import { isColorLight } from '../../../utils/utils';

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];



export const CreateCustomer = (
    { customer, sourceList, tagList, onConfirm }:
        {
            customer: Customer;
            sourceList: CustomerSource[],
            tagList: TagEntity[],
            onConfirm?: (customer: CustomerDetail) => void;
        }
) => {

    const [customerDetail, setCustomerDetail] = useState<CustomerDetail>(new CustomerDetail());
    const [customerSource, setCustomerSource] = useState<CustomerSource[]>([]);
    const [tags, setTags] = useState<TagEntity[]>([]);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {


        let data =  {
            ...customerDetail,...values,
            birthday: (values.birthday as Dayjs).format(DATE_FORMAT.DDMMYYY).toString(),
        }

        delete data.tags;


        if (customerDetail.id == 0){

            // Service.Create(data).then((res) => {
            //     console.log(res)
            //     if ( res.status == 200){
            //         message.success("Create successfully")
            //         {onConfirm && onConfirm(data)}
            //     }else{
            //         message.error(res.message)
            //     }
            // }).catch((error) =>{
            //     console.log(error)

            // })

        }else{
            console.log('Received values of form: ', values);
            customerService.Update(data).then((res) => {
                console.log(res)
                if ( res.status == 200){
                    message.success("update successfully")
                    {onConfirm && onConfirm(data)}
                }else{
                    message.error(res.message)
                }
            }).catch((error) =>{
                console.log(error)

            })
        }
    };




    useEffect(() => {


        customerService.Detail(customer).then((res) => {


            if (res.status == 200) {
                let customer = res.data.lead
                setCustomerDetail(customer)
                form.setFieldsValue({
                    name: customer.name,
                    gender: customer.gender,
                    birthday: customer.birthday.length != 0 ? dayjs(customer.birthday, DATE_FORMAT.DDMMYYY) : undefined,
                    address: customer.street,
                    phone: customer.phone,
                    email: customer.email,
                    lead_source_id: customer.lead_source_id,
                    is_priority:customer.is_priority,
                    tag_ids: customer.tags.map((value) => value.id)
                });
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error)
        })

      

        setTags(tagList)
        setCustomerSource(sourceList)


    }, [customer]);



    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >

            <div className="grid grid-cols-2 gap-x-4">
                <Form.Item
                    name="name"
                    label="Customer Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input your name" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value={GENDER.male}>Male</Option>
                        <Option value={GENDER.female}>Female</Option>
                        <Option value={GENDER.other}>Other</Option>
                    </Select>
                </Form.Item>

            </div>

            <div className="grid grid-cols-2 gap-x-4">

                <Form.Item label="Date Of Birth" name="birthday"
                    rules={[
                        { required: true, message: 'Please input!' },
                        { type: "date" }
                    ]}
                >
                    <DatePicker format={DATE_FORMAT.DDMMYYY} />
                </Form.Item>

                <Form.Item name="Address" label="address">
                    <Input placeholder="Please input your address" />
                </Form.Item>
            </div>


            <div className="grid grid-cols-2 gap-x-4">

                <Form.Item name="phone" label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input placeholder="Please input your phone" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: false,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Please input your email" />
                </Form.Item>

            </div>
            <div className="grid grid-cols-2 gap-x-4 flex items-center">

                <Form.Item name="lead_source_id" label="Customer source" rules={[{ required: true }]} className="mb-3">
                    <Select placeholder="Select a option" allowClear >
                        {customerSource.map((value, _) => <Option key={value.id} value={value.id}>{value.name}</Option>)}
                    </Select>
                </Form.Item>    
              
                <Form.Item name="is_priority"  noStyle>
                    <Checkbox checked={customerDetail.id == 1 ? true : false}>Important!</Checkbox>
                </Form.Item>
            </div>

            <Form.Item name="tag_ids" label="Tags" rules={[{ required: true }]} className="mb-3">
                <Select placeholder="Select a option" allowClear mode="multiple">
                    {tags.map((value, _) => <Option key={value.id} value={value.id}>{value.name} </Option>)}
                </Select>
            </Form.Item>



            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {customer.id > 0 ? "Update" : "Add"}
                </Button>
            </Form.Item>
        </Form>
    );
};

const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, value} = props;
    let style = {
        backgroundColor: `${value.color ?? ""}`,
        color: isColorLight(value.color ?? "") ? "#000000" : "#FFFFFF"
    }   

console.log(label)

    return (
        <span style={style} className="p-2 rounded-xl">asadsad</span>
    );
};