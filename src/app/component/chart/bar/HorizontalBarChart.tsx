import { Bar } from "react-chartjs-2";
import { BarCharStyle } from "./SingleBarChart";



export const HorizontalBarChart = ({ title, style,barChartStyle }: { title?: string; style?: React.CSSProperties,barChartStyle?:BarCharStyle }) => {

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: title,
                align: 'start' as const
            },
        },
    };

    const labels = ['Facebook', 'Zalo', 'Techres', 'Website'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Facebook',
                data: [700, 500, 900, 750],
                borderColor:  [
                    '#2381D4',
                    '#00C7BE',
                    '#FF9500',
                    '#AF52DE'
                ],
                backgroundColor: [
                    '#2381D4',
                    '#00C7BE',
                    '#FF9500',
                    '#AF52DE'
                ],
                borderWidth: 1
            },
        

        ],
    };

    return <Bar options={options} data={data} style={style}/>

}