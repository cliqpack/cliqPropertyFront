import React, { Component } from "react"
import { Bar } from "react-chartjs-2"

class BarChart extends Component {
  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales Analytics",
          backgroundColor: "rgba(52, 195, 143, 0.8)",
          borderColor: "rgba(52, 195, 143, 0.8)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
          hoverBorderColor: "rgba(52, 195, 143, 0.9)",
          data: [65, 59, 81, 45, 56, 80, 50, 20],
        },
        {
          label: "Sales Analytics",
          backgroundColor: 'rgba(255, 82, 82, 0.8)',
          borderColor: 'rgba(255, 82, 82, 0.8)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 82, 82, 0.9)',
          hoverBorderColor: 'rgba(255, 82, 82, 0.9)',
          data: [-365, -59, -81, -45, -156, -280, -350, -420],
        },
      ],
    }

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
        <Bar width={474} height={300} data={data} options={option} />
      </React.Fragment>
    )
  }
}

export default BarChart
