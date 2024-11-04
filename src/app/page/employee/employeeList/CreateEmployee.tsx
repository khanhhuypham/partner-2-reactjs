import React, { useEffect, useState } from 'react';
import type { CascaderProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
    Avatar,
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    message,
    Select,
    Upload,
} from 'antd';

import { User } from "../../../models/user/user";
import { Department } from '../../../models/department';
import { Branch } from '../../../models/branch/branch';
import { DATE_FORMAT } from '../../../constants/constant';
import { GENDER } from '../../../constants/enum';
import { userService } from '../../../services/user/userService';

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



export const CreateEmployee = (
    { user, departments, branches,onConfirm }:
        {
            user: User;
            departments: Department[];
            branches: Branch[];
            onConfirm?: (user:User) => void;
        }
) => {

    // const [data, setData] = useState<Department>(new Department());
    const [departmentList, setDepartmentList] = useState<Department[]>([]);
    const [branchList, setBranchList] = useState<Branch[]>([]);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {




        let data =  {
            ...user,...values,
            branch_ids:values.branches as number[],
            birthday: (values.birthday as Dayjs).format(DATE_FORMAT.DDMMYYY).toString(),
            joining_date:(values.joining_date as Dayjs).format(DATE_FORMAT.DDMMYYY).toString()
        }

        delete data.branches;

    
        if (user.id == 0){

            userService.Create(data).then((res) => {
                console.log(res)
                if ( res.status == 200){
                    message.success("Create successfully")
                    {onConfirm && onConfirm(data)}
                }else{
                    message.error(res.message)
                }
            }).catch((error) =>{
                console.log(error)
             
            })
            
        }else{
            console.log('Received values of form: ', values);
            userService.Update(data).then((res) => {
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
        form.resetFields()

        if (user.id > 0) {
            form.setFieldsValue({
                name: user.name,
                gender: user.gender,
                birthday: user.birthday.length != 0 ? dayjs(user.birthday, DATE_FORMAT.DDMMYYY) : undefined,
                joining_date: user.joining_date.length != 0 ? dayjs(user.joining_date, DATE_FORMAT.DDMMYYY) : undefined,
                phone: user.phone,
                email: user.email,
                branches:user.branches.map((value) => value.id),
                department_id:user.department_id
            });
        }
      
        setDepartmentList(departments)
        setBranchList(branches)


    }, [user]);




    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <div className="space-y-5 mb-5 text-center">


                <h1 className="text-4xl"> {user.id > 0 ? "Update information" : "Add New"}</h1>

                <div className="flex flex-col items-center ">

                    <Form.Item valuePropName="fileList" getValueFromEvent={normFile} className="mb-1">
                        <Upload action="/upload.do" listType="picture-circle">
                            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
                        </Upload>
                    </Form.Item>
                    <p className="text-blue-600">Your Avatar</p>

                </div>

            </div>


            <div className="grid grid-cols-2 gap-x-4">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input your name"/>
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

                <Form.Item
                    label="Date Of Birth"
                    name="birthday"
                    rules={[
                        { required: true, message: 'Please input!' },
                        { type: "date" }
                    ]}
                >
                    <DatePicker format={DATE_FORMAT.DDMMYYY} />
                </Form.Item>

                <Form.Item
                    label="Start work date"
                    name="joining_date"
                    rules={[
                        { required: true, message: 'Please input!' },
                        { type: "date" }
                    ]}
                >
                    <DatePicker format={DATE_FORMAT.DDMMYYY} />
                </Form.Item>
            </div>


            {/* <Form.Item
                name="address"
                label="Address"
                rules={[
                    { type: 'array', required: true, message: 'Please select your habitual residence!' },
                ]}
            >
                <Cascader options={residences} />
            </Form.Item> */}


            <div className="grid grid-cols-2 gap-x-4">

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input placeholder="Please input your phone"/>
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
                    <Input placeholder="Please input your email"/>
                </Form.Item>

            </div>
            <div className="grid grid-cols-2 gap-x-4">

                <Form.Item name="branches" label="Branch" rules={[{ required: true }]} className="mb-3">
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        mode="multiple"
                    >
                        {branchList.map((value, _) => <Option key={value.id} value={value.id}>{value.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name="department_id" label="Department" rules={[{ required: true }]} className="mb-3">
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {departmentList.map((value, _) => <Option key={value.id} value={value.id}>{value.name}</Option>)}
                    </Select>
                </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-x-4">

                <Form.Item name="parent_department_id" label="Senior" rules={[{ required: false }]} className="mb-3">
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                    </Select>
                </Form.Item>

                <Form.Item name="parent_department_id" label="Permission for management" rules={[{ required: false }]} className="mb-3">
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                    </Select>
                </Form.Item>
            </div>



            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {user.id > 0 ? "Update" : "Add"}
                </Button>
            </Form.Item>
        </Form>
    );
};
