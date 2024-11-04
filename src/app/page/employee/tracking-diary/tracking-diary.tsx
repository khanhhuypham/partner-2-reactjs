import { useEffect, useState } from "react";
import { Department } from "../../../models/department";
import { Branch } from "../../../models/branch/branch";
import { Avatar, Card, DatePickerProps, GetProps, Input, List, Select, SelectProps, Tag } from "antd";
import { DatePicker, Space } from 'antd';
import { Option } from "antd/es/mentions";

const { RangePicker } = DatePicker;


const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];

export const TrackingDiary = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);



    const onOk = (value: DatePickerProps['value'] | GetProps<typeof DatePicker.RangePicker>['value']) => {
        console.log('onOk: ', value);
    };

    const loadMoreData = () => {

    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const header = () => {
        return (
            <div className="flex justify-between">

                <div className="flex space-x-2">

                    <Select
                        placeholder={<span className='text-black'>All branches</span>}
                        style={{ width: 200 }}
                        allowClear


                        options={branches.map((d) => ({ label: d.name, value: d.id }))}
                    />

                    <Select
                        placeholder={<span className='text-black'>All departments</span>}
                        style={{ width: 200 }}
                        allowClear

                        options={departments.map((b) => ({ label: b.name, value: b.id }))}
                    />
                </div>

                <div>

                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                    />

                </div>

            </div>
        )
    };



    return (
        <div>
            {header()}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-md">
                    <h1 className="text-2xl p-3">Danh sách nhân viên</h1>
                    <div className="space-y-2">
                        <hr className="text-amber-700" />
                        <div className="px-3">
                            <Input
                                placeholder="default size"
                                prefix={<i className="fa-solid fa-magnifying-glass" />}
                                allowClear
                                onChange={(e) => { }}
                            />
                        </div>
                        <hr />
                    </div>
                    <div className="h-[400px] overflow-auto p-3">
                        <List
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <Select

                                        className="w-full h-full"
                                        placeholder="Select a option and change input text above"
                                        allowClear
                                        onChange={(value) => {
                                            console.log(value)

                                        }}
                                    >
                                        {new Array("Saab", "Volvo", "BMW").map((value, _) => <Option key={value} value={value}>
                                            <div className="flex items-center space-x-2">
                                                <i className="fa-brands fa-facebook"></i>
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-lg">182 Phan Kế Bính, P.Đa Kao, Q.1</p>
                                                    <p className="text-sm text-slate-500">Thời gian dừng: <span className="text-blue-500">15 phút</span></p>
                                                </div>
                                            </div>
                                        </Option>)}
                                    </Select>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-2 bg-slate-500"></div>
            </div>
        </div>
    )

}