import { Select } from "antd";
import { Bar } from "react-chartjs-2";
import { reportFilter } from "../../../constants/constant";



export const VBarChart = (
    { title, style, data, showFilter, filterClousure }:
    { title?: string; style?: React.CSSProperties; data: any; showFilter?: boolean; filterClousure?: ((value: number) => void) }) => {

    // let delayed: boolean = false;
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                align: "start" as const,
            },
            title: {
                display: true,
                text: title,
                align: "start" as const

            },
        },
        // animation: {
        //     onComplete: () => {
        //         delayed = true;
        //     },
        //     delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
        //         let delay = 0;
        //         if (context.type === "data" && context.mode === "default" && !delayed) {
        //             delay = context.dataIndex * 300 + context.datasetIndex * 100;
        //         }
        //         return delay;
        //     },
        // },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };




    return (
        <div>
            {showFilter && showFilter == true &&
                <div className='flex justify-end'>
                    <Select
                        defaultValue={1}
                        placeholder="Select a person"
                        // optionFilterProp="label"
                        onChange={(value: number) => filterClousure && filterClousure(value)}
                        options={reportFilter}
                    />
                </div>
            }
            <Bar data={data} options={options} style={style} />
        </div>
    )
}