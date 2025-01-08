import React from "react"
import { Bar } from "react-chartjs-2"

const ODBarChart = (props) => {
    const option = {
        scales: {
            dataset: [
                {
                    barPercentage: 0.4,
                },
            ],
        },
    }
    return (
        <React.Fragment>
            <Bar width={474} height={300} data={props.odBarChartData} options={option} />
        </React.Fragment>
    )
}


export default ODBarChart
