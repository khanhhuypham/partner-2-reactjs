import { Bar } from "react-chartjs-2";
import { Select } from "antd";
import { reportFilter } from "../../../constants/constant";



export const HBarChart = (
    { title, style,data, showFilter, filterClousure }:
    { title?: string; style?: React.CSSProperties;data: any; showFilter?: boolean; filterClousure?: ((value: number) => void) }
) => {

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
            <Bar options={options} data={data} style={style}/>
        </div>
    )

}