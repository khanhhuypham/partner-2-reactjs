import { Select } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { reportFilter } from '../../../constants/constant';




export const LineChart = (
    { title, style, data, showFilter, filterClousure }:
    { title?: string; style?: React.CSSProperties; data: any; showFilter?: boolean; filterClousure?: ((value: number) => void) }
) => {

    // Ref to access the chart instance
    // const chartRef = useRef(null);

    // State to manage the progress animation
    const [progress, setProgress] = useState(0);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: title,
                align: 'start' as const,
            },

            legend: {
                display: true,
                align:"start" as const,
                padding:{
                    bottom:"30px"
                }
            },

        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },

        animation: {
            duration: 2000,
            onProgress: function (context: {
                currentStep: number;
                numSteps: number;
            }) {
                setProgress(Math.round((context.currentStep / context.numSteps) * 100));
            },
            onComplete: function () {
                console.log("Animation completed");
            },
        },
    };



    return (
        <div>

            {showFilter && showFilter == true &&
                <div className='flex justify-end'>
                    <Select

                        placeholder="Select a person"
                        // optionFilterProp="label"
                        defaultValue={1}
                        onChange={(value: number) => filterClousure && filterClousure(value)}
                        options={reportFilter}
                    />
                </div>
            }
            <Line options={options} data={data} style={style} />
        </div>
    )

}