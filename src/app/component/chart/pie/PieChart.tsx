import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { reportFilter } from "../../../constants/constant";
import { Select } from "antd";

export const PieChart = (
    { title, style, data, showFilter, filterClousure }:
        { title?: string; style?: React.CSSProperties, data: any; showFilter?: boolean; filterClousure?: ((value: number) => void) }
) => {

    // State to control label visibility
    const [showPercent, setShowPercent] = useState(false);

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 800,
            easing: "easeOutQuad",
            onComplete: () => {
                // Show the percentage after the animation completes
                setShowPercent(true);
            },
        },
        plugins: {
            legend: {
                position: "left" as const,
                labels: {
                    boxWidth: 20,
                    boxHeight: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: title,
                align: "start" as const

            },
            datalabels: {
                display: showPercent, // Display based on state
                anchor: "end" as const,
                align: "start" as const,
                formatter: (
                    value: number,
                    context: { dataset: { data: number[] } }
                ) => {
                    const total = context.dataset.data.reduce((acc, curr) => acc + curr,0);
                    const percentage = ((value / total) * 100).toFixed(2) + "%";
                    return percentage;
                },
                color: "#000",
                font: {
                    weight: "bold" as const,
                    size: 10,
                },
                offset: 10,
                backgroundColor: "transparent",
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                },
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
            <Doughnut data={data} options={options} style={style} />
        </div>
    )


};
