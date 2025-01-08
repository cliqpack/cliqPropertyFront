import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"
import moment from 'moment'

const Apexchart = (props) => {
    console.log(props.data);
    // console.log(props.data.money_in.map(item => item.value));
    const moneyIn = props.data?.money_in?.map(item => item?.value);
    // console.log(props.data.money_out.map(item => item.value));
    const moneyOut = props.data?.money_out?.map(item => item?.value);
    const month1 = props.data?.money_in?.length ? props.data?.money_in?.map(item => moment(item?.month).format('MMM')) : props.data?.money_out?.map(item => moment(item?.month).format('MMM'));
    console.log(moneyIn, moneyOut, month1);

    const [arr, setArr] = useState([46, 57, 59, 54, 62, 58, 64, 60, 66])
    const [state, setState] = useState({

        series: [
            {
                name: "Money Out",
                data: moneyOut,
            },
            {
                name: "Money In",
                // data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
                data: moneyIn,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "45%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },

            colors: ["#34c38f", "#556ee6"],
            xaxis: {
                // categories: [
                //     "Feb",
                //     "Mar",
                //     "Apr",
                //     "May",
                //     "Jun",
                //     "Jul",
                //     "Aug",
                //     "Sep",
                //     "Oct",
                // ],
                categories: month1,
            },
            yaxis: {
                title: {
                    text: "$ (thousands)",
                },
            },
            grid: {
                borderColor: "#f1f1f1",
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {

                        return "$ " + val + " thousands"
                    },
                },
            },
        },
    })

    return (
        <React.Fragment>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
                className="apex-charts"
            />
        </React.Fragment>


    )
}

export default Apexchart;
