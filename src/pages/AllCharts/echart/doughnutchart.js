import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"

class Doughnut extends Component {
  getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["Laptop", "Tablet", "Mobile", "Others", "Desktop"],
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#159B9C", "#f1b44c", "#f46a6a", "#159B9C", "#34c38f"],
      series: [
        {
          name: "Total sales",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 335, name: "Laptop" },
            { value: 310, name: "Tablet" },
            { value: 234, name: "Mobile" },
            { value: 135, name: "Others" },
            { value: 1548, name: "Desktop" },
          ],
        },
      ],
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
      </React.Fragment>
    )
  }
}
export default Doughnut
