import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { userService } from '../../services/user/userService';
import { getDeviceUUID } from '../../utils/utils';
import { ROUTE_LINK } from '../../routes/route-link';

type FieldType = {
    identifierName?:string;
    phone?: number;
    password?: string;
    remember?: boolean;
};



export const Login: React.FC = () => {

    const [credential, setCredential] = useState<FieldType>(
        {
            identifierName:"",
            password:"",
        }
    );


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        
        console.log(values)
        userService.Login({
            identifier_name: values.identifierName ?? "",
            device_uuid: getDeviceUUID(),
            phone: values.phone?.toString() ?? "",
            password: btoa(values.password ?? "")
        }).then((res) =>{
     
            if (res.status === 200) {
                // setCookie("XSRF-TOKEN", responseLogin.data.access_token);
                // setCookie("COMPANY-NAME", identifierName);
                // setCookie("UserId", String(responseLogin.data.id));
                 window.location.href = ROUTE_LINK.HOME;
            } else {
                message.error(res.message);
            }
        }).catch((error) => {

        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <div className="h-screen w-screen flex justify-center items-center">

            <div className="relative right-20">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >

                    <Form.Item<FieldType>
                        label="Company"
                        name="identifierName"
                        rules={[{ required: true, message: 'Please input company!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input phone!' },
                            { max: 10, message: 'phone must be maximum 10 characters.' },
                            {transform:(value) => {
                                
                            }}
                        ]}
                        shouldUpdate={(prevValues, curValues) => prevValues.phone !== curValues.phone}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>


    )
}

