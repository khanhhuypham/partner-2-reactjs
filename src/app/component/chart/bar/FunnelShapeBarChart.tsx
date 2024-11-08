import { useEffect } from "react";
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { reportFilter } from "../../../constants/constant";
import { Select } from "antd";

export const FunnelShapeBarChart = (
    { title, style, data, showFilter, filterClousure }:
    { title?: string; style?: React.CSSProperties; data: any; showFilter?: boolean; filterClousure?: ((value: number) => void) }
) => {


    useEffect(() => {
        const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');

        if (ctx != null) {

            const myChart = new Chart(ctx, {
                type: 'funnel',
                data: data,
                options: {
                    indexAxis: 'y' as const,
                    responsive: true,
                    plugins: {
                        legend: {
                            display:false,
                            position: 'left' as const,
                        },
                        title: {
                            display: true,
                            text: title,
                            align: 'start' as const
                        },
                    },
                },
                plugins: [ChartDataLabels],
            });

            // Clean up the chart on component unmount
            return () => {
                myChart.destroy();
            };

        }

    }, [data]);

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
            <div id="container" style={style}>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    )

};
