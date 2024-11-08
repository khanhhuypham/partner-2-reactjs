import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

export const PieChart = ({title,style}:{title?:string;style?:React.CSSProperties}) => {
    // Utility function to generate random numbers
    const Utils = {
        numbers: (cfg: { count: number; max: number; min: number }) => {
            return Array.from({ length: cfg.count }, () =>
                Math.floor(Math.random() * (cfg.max - cfg.min + 1) + cfg.min)
            );
        },
        CHART_COLORS: {
            Red: "rgb(255, 99, 132)",
            Orange: "rgb(255, 159, 64)",
            Yellow: "rgb(255, 205, 86)",
            Green: "rgb(75, 192, 192)",
        },
    };

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ["Facebook", "Google", "Zalo", "Techres", "Web"],
        datasets: [
            {
                label: "Dataset 1",
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            },
        ],
    };

    // State to control label visibility
    const [showPercent, setShowPercent] = useState(false);

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000,
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
                text:title,
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
                    const total = context.dataset.data.reduce(
                        (acc, curr) => acc + curr,
                        0
                    );
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

    return  <Doughnut data={data} options={options} style={style}/>
     

};
