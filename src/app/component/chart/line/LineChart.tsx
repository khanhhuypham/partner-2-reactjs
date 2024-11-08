import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';


// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );



export const LineChart = ({title,style}:{title?:string;style?:React.CSSProperties}) =>{

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

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
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
    };


    return <Line options={options} data={data} style={style}/>

}