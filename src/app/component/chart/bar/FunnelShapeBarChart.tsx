import { Bar } from "react-chartjs-2";


export const FunnelShapeBarChart = () => {
    const data = {
        labels: ["2", "4", "5", "6", "8"],
        datasets: [
            {
                label: "Closing Costs",
                data: [50],
                backgroundColor: "#e8cdd7",
                stack: "stack 1",
            },
            {
                label: "Purchase Price",
                data: [700],
                backgroundColor: "#d29baf",
                stack: "stack 1",
            },
            {
                data: [200],
                waterfall: {
                    dummyStack: true,
                },
                stack: "stack 2",
            },
            {
                label: "Opening Loan Balance",
                data: [550],
                backgroundColor: "#bb6987",
                stack: "stack 2",
            },
            {
                label: "Initial Cash Investment",
                data: [200],
                backgroundColor: "#a53860",
                stack: "stack 3",
            },
        ],
    };

    //   const plugins = [waterFallPlugin];

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    boxWidth: 18,
                    width: "20px",
                    height: "20px",
                    usePointStyle: true,
                    pointStyle: "rect",
                },
            },
            waterFallPlugin: {
                stepLines: {
                    enabled: true,
                    startColorStop: 0,
                    endColorStop: 0.6,
                    startColor: "rgba(0, 0, 0, 0.55)",
                    endColor: "rgba(0, 0, 0, 0)",
                    diagonalStepLines: true,
                },
            },
        },
    };
    return <Bar id="myChart" data={data}></Bar>;
};
