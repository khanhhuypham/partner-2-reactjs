import { useEffect } from "react";
import { SingleBarChart } from "../../component/chart/bar/SingleBarChart";
import { PieChart } from "../../component/chart/pie/PieChart";
import { LineChart } from "../../component/chart/line/LineChart";
import { Card } from "antd";




export const CampaignReport = () => {


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
                <LineChart title="Doanh thu theo ngày trong tháng" style={{ maxHeight: "400px", minHeight: "300px" }} />
            </Card>
            <div className="grid grid-rows-2 grid-flow-col gap-4">

                <Card className="row-span-2">
                    <SingleBarChart title="Thống kê doanh số theo chi nhánh" />
                </Card>

                <Card >
                    <PieChart title="Danh số theo dịch vụ" style={{ width: "100%", height: "250px" }} />
                </Card>

                <Card>
                    <SingleBarChart style={{ maxHeight: "250px" }} />
                </Card>

            </div>

        </>
    )

};

