import { Bar } from "react-chartjs-2";



export type BarCharStyle = {
    datasetTitle: string;
    barBgColor: string;
}


export const SingleBarChart = ({ title, style,barChartStyle }: { title?: string; style?: React.CSSProperties,barChartStyle?:BarCharStyle }) => {

    // let delayed: boolean = false;
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                align:"start" as const,
            },
            title: {
                display: true,
                text:title,
                align:"start" as const
              
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


    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label:barChartStyle?.datasetTitle,
                data: [700, 500, 900, 750, 700, 500, 200],
                backgroundColor: barChartStyle?.barBgColor,
            },
        ],
    };

    return <Bar data={data} options={options} style={style} />
}