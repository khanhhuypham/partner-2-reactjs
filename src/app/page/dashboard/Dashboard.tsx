import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Select } from "antd";
import { SingleBarChart } from "../../component/chart/bar/SingleBarChart";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { PieChart } from "../../component/chart/pie/PieChart";
import { HorizontalBarChart } from "../../component/chart/bar/HorizontalBarChart";

export const Dashboard = () => {

    const items: { title: string, content: string }[] = [
        { title: "100.000.000.000", content: "TỔNG NHÂN VIÊN" },
        { title: "100", content: "CHIẾN DỊCH ĐANG CHẠY" },
        { title: "100", content: "KHÁCH HÀNG MỚI" }
    ]


    const renderCard = ({ content }: { content: JSX.Element | undefined }) => {
        return (
            <Card bordered={false} className="text-center">
                {content}
            </Card>
        )
    }


    return (
        <>
            <div className="grid grid-cols-3 gap-4">

                {items.map((item) => renderCard(
                    {
                        content: (
                            <>
                                <p className="text-blue-700 text-3xl font-bold">100</p>
                                <p className="text-xl font-medium">CHIẾN DỊCH ĐANG CHẠY</p>
                            </>
                        )
                    }
                ))}
            </div>

            <div>
                <div className="grid grid-rows-3 gap-4">

                    <div className="grid grid-cols-3 gap-2">

                        <Card className="col-span-2">
                            <SingleBarChart
                                title="Lượng khách hàng mới được thêm vào"
                                style={{ maxHeight: "250px" }}
                                barChartStyle={{
                                    datasetTitle: "",
                                    barBgColor: "#1462B0"
                                }}
                            />
                        </Card>

                        <Card>

                            <div className="flex gap-2 items-center">

                                <span>Bảng xếp hạng: </span>

                                <Select
                                    className="w-auto"
                                    placeholder="Search to Select"
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Theo tuần',
                                        },
                                        {
                                            value: '2',
                                            label: 'Closed',
                                        },
                                        {
                                            value: '3',
                                            label: 'Communicated',
                                        },
                                        {
                                            value: '4',
                                            label: 'Identified',
                                        },
                                        {
                                            value: '5',
                                            label: 'Resolved',
                                        },
                                        {
                                            value: '6',
                                            label: 'Cancelled',
                                        },
                                    ]}
                                />
                            </div>

                            <Table<DataType> columns={columns} dataSource={data} scroll={{ y: 250 }} pagination={false} />
                        </Card>
                    </div>


                    <div className="grid grid-cols-2 gap-4">

                        <Card >
                            <PieChart title="Danh số theo dịch vụ" style={{ width: "100%", maxHeight: "250px" }} />
                        </Card>

                        <Card>
                            <HorizontalBarChart title="Nguồn khách hàng" style={{ maxHeight: "250px" }} />
                        </Card>
                    </div>


                    <div className="grid grid-cols-2 gap-4">

                        <Card >
                            <PieChart title="Danh số theo dịch vụ" style={{ width: "100%", maxHeight: "250px" }} />
                        </Card>

                        <Card>
                            <HorizontalBarChart title="Nguồn khách hàng" style={{ maxHeight: "250px" }} />
                        </Card>
                    </div>


                </div>
            </div>
        </>
    );
};


interface DataType {
    key: string;
    name: string;
    age: number;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Employee',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Contract Quantity',
        dataIndex: 'age',
        key: 'age',
    },

];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,

    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
    },
];
