import { useEffect, useState } from "react";
import { VBarChart } from "../../component/chart/bar/VBarChart";
import { PieChart } from "../../component/chart/pie/PieChart";
import { LineChart } from "../../component/chart/line/LineChart";
import { Card } from "antd";
import { FunnelShapeBarChart } from "../../component/chart/bar/FunnelShapeBarChart";
import { generateRandomArray } from "../../utils/utils";




export const CampaignReport = () => {

    const [lineChartData, setLineChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1111',
                data: [33, 53, 85, 41, 44, 65, 65],
                borderColor: '#D68512',
                backgroundColor: '#D68512',
                yAxisID: 'y',
                tension: 0.4,
            },
            {
                label: 'Dataset 2222222',
                data: [33, 25, 35, 51, 54, 76, 65],
                borderColor: '#448955',
                backgroundColor: '#448955',
                yAxisID: 'y1',
                tension: 0.4,
            },
        ],
    })

    const [vBarChartData, setVBarChartData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "asdsad",
                data: [700, 500, 900, 750, 700, 500, 200],
                backgroundColor: "#E96012",
            },
        ],
    })



    const [pieChartData, setPieChartData] = useState({
        labels: ["Service1", "Service2", "Service3", "Service4"],
        datasets: [
            {
                label: "Dataset 1",
                data: [30, 20, 40, 10],
                backgroundColor: ["#13C296", "#F69641", "#9B51E0", "#2381D4"],
            },
        ],
    })


    const [funnelChartData, setFunnelChartData] = useState({
        labels: ['Step 1', 'Step 2', 'Step 3','Step 4','Step 5','Step 6'],
        datasets: [
            {
                data:[40,20,15,10,5],
                datalabels: {
                    formatter: (v:string,ctx:any) => v.toLocaleString() + "%",
                    display:true
                },
                backgroundColor: ['#F4D400','#13C296','#2381D4','#F69641','#9B51E0',"#D10000"],
                shrinkAnchor: 'bottom',
                shrinkFraction: 1,
            },

        ],
    })


    const items: { title: string, content: string }[] = [
        { title: "Ngân sách", content: "2,736,029,000" },
        { title: "Chi phí thật tế", content: "8,365,287,000" },
        { title: "Lead thu về", content: "44,822" },
        { title: "Cơ hội", content: "11,264" },
        { title: "SỔ LỊCH HẸN", content: "2,828" },
        { title: "lịch hẹn đã đén", content: "1,722" },
    ]




    const renderCard = ({ content }: { content: JSX.Element | undefined }) => {
        return (
            <Card bordered={false}>
                {content}
            </Card>
        )
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            <div className="grid grid-cols-5 gap-5">
                {items.map((item) => renderCard(
                    {
                        content: (
                            <div className="flex content-center justify-start" style={{ width: "100%" }}>
                                <div className="py-1">
                                    <h5 className="font-semibold text-md text-blue-600 mb-2">
                                        {item.title.toLocaleUpperCase()}
                                    </h5>
                                    <div>
                                        <h5 className="font-bold text-orange-600 text-lg">  {item.content}</h5>
                                        <div className="font-normal space-x-3">

                                            <span>
                                                <span>Kỳ trước: </span>
                                                <span className="text-blue-600">13.5 tỷ</span>
                                            </span>

                                            <span className="text-green-700"> +13.5 tỷ</span>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                ))}
            </div>
            <Card>
                <LineChart title="Doanh thu theo ngày trong tháng" style={{ maxHeight: "400px", minHeight: "300px" }} data={lineChartData}
                    showFilter={true}
                    filterClousure={(value) => {
                        setLineChartData({
                            ...lineChartData, // Spread the existing state to keep other properties unchanged
                            datasets: [
                                {
                                    ...lineChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                    data: generateRandomArray(7, 1, 100), // Update the data property
                                },

                                {
                                    ...lineChartData.datasets[1], // Spread the existing dataset to keep its other properties unchanged
                                    data: generateRandomArray(7, 1, 100), // Update the data property
                                },
                            ],
                        });
                    }}

                />
            </Card>
            <div className="grid grid-rows-2 grid-flow-col gap-4">

                <Card className="row-span-2">
                    <VBarChart
                        title="Thống kê doanh số theo chi nhánh"
                        data={vBarChartData}
                        showFilter={true}
                        filterClousure={(value) => {
                            setVBarChartData({
                                ...vBarChartData, // Spread the existing state to keep other properties unchanged
                                datasets: [
                                    {
                                        ...vBarChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                        data: generateRandomArray(7, 1, 100), // Update the data property
                                    },
                                ],
                            });
                        }}

                    />
                </Card>

                <Card >
                    <PieChart
                        title="Danh số theo dịch vụ" style={{ width: "100%", maxHeight: "250px" }}
                        data={pieChartData}
                        showFilter={true}
                        filterClousure={(value) => {
                            setPieChartData({
                                ...pieChartData, // Spread the existing state to keep other properties unchanged
                                datasets: [
                                    {
                                        ...pieChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                        data: generateRandomArray(4, 1, 100), // Update the data property
                                    },
                                ],
                            });
                        }}
                    />
                </Card>

                <Card>
    
                    <FunnelShapeBarChart title="Tỷ lệ chốt hợp đồng" style={{ maxHeight: "350px" }} 
                        data={funnelChartData}
                        showFilter={true}
                        filterClousure={(value) => {
                            setFunnelChartData({
                                ...funnelChartData, // Spread the existing state to keep other properties unchanged
                                datasets: [
                                    {
                                        ...funnelChartData.datasets[0], // Spread the existing dataset to keep its other properties unchanged
                                        data: generateRandomArray(5, 1, 100), // Update the data property
                                    },
                                ],
                            });
                        }}
                    />
                </Card>

            </div>

        </>
    )

};

