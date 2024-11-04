import { useEffect, useState } from "react";

import { Button, Input, message, Pagination, PaginationProps, Select, Table, Tabs, Tag, Tooltip } from "antd";
import { Pagination as pageModel } from '../../../models/pagination';
import { Customer, CustomerPage } from "../../../models/customer/customer";
import { ColumnsType, TableProps } from "antd/es/table";
import { customerService } from "../../../services/customer/customerService";
import { TagEntity } from "../../../models/customer/tag";
import { isColorLight, useDebounce } from "../../../utils/utils";
import { CustomerSource } from "../../../models/customer/customer-source";

export const CustomerList = () => {

    const [data, setData] = useState<CustomerPage>(new CustomerPage());
    const [tags, setTags] = useState<TagEntity[]>([]);
    const [customerSource, setCustomerSource] = useState<CustomerSource[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<[open: boolean, content?: JSX.Element | undefined]>([false, undefined]);

    const [parameter, setParameter] = useState({
        pagination: { ...(new pageModel()), limit: 10, page: 1 },
        tag_id: -1,
        lead_source_id: -1
    });
    const debounceValue = useDebounce(parameter.pagination.key_search, 800);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    }


    const fetchData = () => {

        setLoading(true);

        customerService.List(parameter).then((res) => {

            setLoading(false);

            if (res.status == 200) {
                setData(res.data)
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    const onPageChange: PaginationProps['onChange'] = (page) => {
        let p = { ...parameter.pagination, page: page }
        setParameter({ ...parameter, pagination: p });
    };

    const columns: ColumnsType<Customer> = [
        {
            title: 'Order',
            dataIndex: '',
            render: (record, _, index) => index + 1,
            width: 30,
        },

        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
        },
        {
            title: 'Phone',
            dataIndex: 'customer_phone',
            width: 80,
        },

        {
            title: 'Created at',
            dataIndex: 'created_at',
            width: 150,
        },

        {
            title: 'Updated at',
            dataIndex: 'updated_at',
            width: 150,
        },



        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (i, { tags }) => {
                let style = {
                    backgroundColor:`${tags.at(0)?.color ?? ""}`,
                    color:isColorLight(tags.at(0)?.color ?? "") ? "#000000": "#FFFFFF"
                }
                return (
                    <Tooltip placement="right" title={toolTipTable(tags)} arrow={false} color="white" className="space-x-2">
                        <span style={style} className="p-2 rounded-md">{tags.at(0)?.name ?? ""}</span>
                    </Tooltip>
                )
            }
        },

        {
            title: 'Source',
            dataIndex: 'lead_source_name',
        },


        {
            title: 'Action',
            dataIndex: '',
            render: (i, row) => (
                // {row.status == user_status.INACTIVE && disabled}
                <div className="">


                    <Button onClick={() => {

                    }} type="text">
                        <i className="fa-solid fa-eye"></i>
                    </Button>

                    <Button onClick={() => { }} type="text">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>

                    <Button type="text" danger onClick={() => { }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </div>
            )
        },

    ];


    const header = () => {
        return (
            <div>
                <div className="flex justify-between">
                    <Tabs
                        defaultActiveKey="-1"
                        color="orange"
                        items={[{ text: "Khách chính thức", value: -1 }, { text: "Khách tiềm năng", value: 1 }].map((element, i) => {
                            return {
                                key: element.value.toString(),
                                label: (
                                    <div className="space-x-2">
                                        <span>{element.text}</span>
                                        <span className='text-[11px] p-1 bg-slate-200 rounded-full'>99+</span>
                                    </div>
                                ),
                            };
                        })}

                    />

                    <div>

                        <Button
                            color="danger"
                            variant="solid"
                            icon={<i className="fa-solid fa-plus"></i>}
                            className="text-base"

                        >
                            Add
                        </Button>

                    </div>
                </div>
                <div className="flex space-x-2">


                    <Input
                        placeholder="default size"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            let p = { ...parameter.pagination, key_search: e.target.value ?? "", page: 1 }
                            setParameter({ ...parameter, pagination: p })
                        }}
                    />

                    <Select
                        placeholder={<span className='text-black'>All tags</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            console.log(value)
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, tag_id: Number(value ?? -1), pagination: p })

                        }}

                        options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}


                    />

                    <Select
                        placeholder={<span className='text-black'>Source</span>}
                        style={{ width: 200 }}
                        allowClear
                        onChange={(value) => {
                            console.log(value)
                            let p = { ...parameter.pagination, page: 1 }
                            setParameter({ ...parameter, lead_source_id: Number(value ?? -1), pagination: p })

                        }}

                        options={customerSource.map((s) => ({ label: s.name, value: s.id }))}

                    />
                </div>

            </div>
        )
    };


     useEffect(fetchData, [
        parameter.pagination.page,
        parameter.tag_id,
        parameter.lead_source_id,
        debounceValue
    ]);

    useEffect(() => {
        customerService.TagList().then((res) => {
            if (res.status == 200) {
                setTags(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });


        customerService.CustomerSourceList().then((res) => {

            if (res.status == 200) {
                setCustomerSource(res.data);
            } else {
                message.error(res.message)
            }

        }).catch((error) => {
            console.log(error);
        });


    }, []);




    return (
        <>
            {header()}
            <Table<Customer>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data?.list}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={parameter.pagination.page} onChange={onPageChange} total={data?.total_record} />}
            />
        </>
    );
};




const toolTipTable = (branches: TagEntity[]) => {


    const columnsOfToolTipTable: TableProps<TagEntity>['columns'] = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            render: (name, row, index) => {
                let style = {
                    backgroundColor:`${row.color ?? ""}`,
                    color:isColorLight(row.color ?? "") ? "#000000": "#FFFFFF"
                }
                return <span style={style} className="p-2 rounded-md">{name}</span>
            },
        },
    ];

    return (
        <Table<TagEntity>
            columns={columnsOfToolTipTable}
            dataSource={branches}
            size="small"
            showHeader={false}
            pagination={false}
        />
    )
}