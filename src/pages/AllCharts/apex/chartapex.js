import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class chartapex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [
        { name: "", data: this.props?.prevData ? [...this.props?.prevData] : [] },
        { name: "", data: [...this.props?.data] },
      ],
      options: {
        chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
        colors: ["#159B9C", "#34c38f"],
        dataLabels: { enabled: !0 },
        stroke: { width: [3, 3], curve: "straight" },
        title: { text: this.props.title ? this.props.title : '', align: "left" },
        grid: {
          row: { colors: ["transparent", "transparent"], opacity: 0.2 },
          borderColor: "#f1f1f1",
        },
        markers: { style: "inverted", size: 6 },
        xaxis: {
          categories: [...this.props?.category],
          title: { text: this.props.xtitle ? this.props.xtitle : '' },
        },
        yaxis: { title: { text: this.props.ytitle ? this.props.ytitle : '' }, min: this.props.min ? this.props.min : 0, max: this.props.max ? this.props.max : 0 },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: !0,
          offsetY: -25,
          offsetX: -5,
        },
        responsive: [
          {
            breakpoint: 600,
            options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
          },
        ],
      },
    }
  }
  componentDidUpdate(prev) {
    if (prev !== this.props) {
      this.setState(prev => ({
        ...this.prev,
        series: [
          // { name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33] },
          { name: "", data: [...this.props?.data] },
        ],
        options: {
          chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
          colors: ["#159B9C", "#34c38f"],
          dataLabels: { enabled: !0 },
          stroke: { width: [3, 3], curve: "straight" },
          title: { text: this.props.title ? this.props.title : '', align: "left" },
          grid: {
            row: { colors: ["transparent", "transparent"], opacity: 0.2 },
            borderColor: "#f1f1f1",
          },
          markers: { style: "inverted", size: 6 },
          xaxis: {
            categories: [...this.props?.category],
            title: { text: this.props.xtitle ? this.props.xtitle : '' },
          },
          yaxis: { title: { text: this.props.ytitle ? this.props.ytitle : '' }, min: this.props.min, max: this.props.max },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: !0,
            offsetY: -25,
            offsetX: -5,
          },
          responsive: [
            {
              breakpoint: 600,
              options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
            },
          ],
        },
      }));
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={this.props.height ? this.props.height : '380'}
          className="apex-charts"
        />
      </React.Fragment>
    )
  }
}

export default chartapex
