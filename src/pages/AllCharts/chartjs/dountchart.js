import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"

class DountChart extends Component {
  render() {
    const data = {
      labels: ["Desktops", "Tablets"],
      datasets: [
        {
          data: [300, 210],
          backgroundColor: ["#159B9C", "#ebeff2"],
          hoverBackgroundColor: ["#159B9C", "#ebeff2"],
          hoverBorderColor: "#fff",
        },
      ],
    }
    return (
      <React.Fragment>
        <Doughnut width={474} height={260} data={data} />
      </React.Fragment>
    )
  }
}

export default DountChart
