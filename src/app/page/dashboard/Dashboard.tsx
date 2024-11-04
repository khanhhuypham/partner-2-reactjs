import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <Card bordered={false} className="text-center">
                    <p className="text-blue-700 text-3xl font-bold">
                        100.000.000.000{" "}
                    </p>
                    <p className="text-xl font-medium"> TỔNG NHÂN VIÊN</p>
                </Card>
                <Card bordered={false} className="text-center">
                    <p className="text-blue-700 text-3xl font-bold">100</p>
                    <p className="text-xl font-medium">CHIẾN DỊCH ĐANG CHẠY</p>
                </Card>
                <Card bordered={false} className="text-center">
                    <p className="text-blue-700 text-3xl font-bold">100</p>
                    <p className="text-xl font-medium">KHÁCH HÀNG MỚI</p>
                </Card>
            </div>

            <div>
                <div>
                    <div>
                        <BarChart width={150} height={40} data={BarchartData}>
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>

                        <PieChart width={400} height={400}>
                            <Pie
                                data={PieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {PieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>


                    <div>

                        <LineChart width={300} height={100} data={LineChartData}>
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </div>

                </div>
            </div>
        </>
    );
};


const BarchartData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


const PieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const LineChartData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
