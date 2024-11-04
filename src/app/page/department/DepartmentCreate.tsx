import { useState, useEffect } from "react";
import { departmentService } from "../../services/department/departmentService";

import { Department } from "../../models/department";
import { Button, Form, Input, message, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;




export const CreateDepartment = ({
    department,
    departmentList,
    onConfirm,
    onClose,
}: {
    department: Department;
    departmentList: Department[];
    onConfirm?: () => void;
    onClose?: () => void;
}) => {

    const [data, setData] = useState<Department>(new Department());
    const [list, setList] = useState<Department[]>([]);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      
        console.log(values)
        if (data.id == 0){
            departmentService.Create(data).then((res) => {
                if ( res.status == 200){
                    message.success("update successfully")
                    {onConfirm && onConfirm()}
                }else{
                    message.error(res.message)
                }
            }).catch((error) =>{
                console.log(error)
             
            })
        }else{
            departmentService.Update(data).then((res) => {

                if ( res.status == 200){
                    message.success("Update successfully")
                    {onConfirm && onConfirm()}
                }else{
                    message.error(res.message)
                }
            }).catch((error) =>{
                console.log(error)
            })
        }

    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };



    useEffect(() => {
        form.resetFields()

        form.setFieldsValue({ 
            name: department.name,
            parent_department_id: department.parent_department_id > 0 ? department.parent_department_id : undefined,
            description:department.description
        });

        setData(department)
        setList(departmentList);
   
    },[department]);

    return (
        <div>
            <h1 className="text-center font-bold text-2xl mb-6">{department.id == 0 ? "Create Department" : "Edit Department"}</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name="name"
                    label="Department Name"
                    rules={[
                        { required: true },
                        { type: "string", min: 6 },
                    ]}
                    className="mb-3"
                >
                    <Input 
                        placeholder="Enter..."
                        value={data.name}
                        onChange={(e) => {
                            setData({...data,name: e.target.value})
                        }}
                    />
                </Form.Item>

                <Form.Item name="parent_department_id" label="Senior" rules={[{ required: true }]} className="mb-3">
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        onChange={(value) => {
                            console.log(value)
                            setData({...data,parent_department_id: value})
                        }}
                    >
                        {list.map((value, _) => <Option key={value.id} value={value.id}>{value.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name="description" label="Description" className="mb-10">
                    <TextArea 
                        rows={3}
                        placeholder="Description...." 
                        value={data.description}
                        onChange={(e) => {   
                            setData({ ...data, description: e.target.value })
                        }} />
                </Form.Item>

                <Form.Item>
                    <Space className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            {department.id == 0 ? "Add" : "Update"}  
                        </Button>
                        <Button htmlType="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};
