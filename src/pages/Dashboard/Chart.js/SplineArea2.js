import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts"
import moment from "moment";
import { connect } from "react-redux";
import { getDeshboardInsightsPropertyData } from 'store/actions';
import { withTranslation } from "react-i18next";

const SplineArea2 = (props) => {
    const [seen, setSeen] = useState(false);
    const [valueOne, setValueOne] = useState();
    const [valueTwo, setValueTwo] = useState();
    const [valueThree, setValueThree] = useState();

    // const catArr = props.dashboardInsightsPropertyData ? props.dashboardInsightsPropertyData?.xaxis?.categories : ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05', '2023-07-06', '2023-07-07', '2023-07-08', '2023-07-09', '2023-07-10', '2023-07-11', '2023-07-12', '2023-07-13', '2023-07-14', '2023-07-15', '2023-07-16', '2023-07-17', '2023-07-18', '2023-07-19', '2023-07-20', '2023-07-21', '2023-07-22', '2023-07-23', '2023-07-24', '2023-07-25', '2023-07-26', '2023-07-27', '2023-07-28', '2023-07-29', '2023-07-30', '2023-07-31', '2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05', '2023-08-06', '2023-08-07', '2023-08-08', '2023-08-09', '2023-08-10', '2023-08-11', '2023-08-12'];
    // const catArr = props ? props?.date : [
    //     "2022-07-07T00:00:00",
    //     "2022-07-08T00:00:00",
    //     "2022-07-09T00:00:00",
    //     "2022-07-10T00:00:00",
    //     "2022-07-11T00:00:00",
    //     "2022-07-12T00:00:00",
    //     "2022-07-13T00:00:00",
    //     "2022-07-14T00:00:00",
    //     "2022-07-15T00:00:00",
    //     "2022-07-16T00:00:00",
    //     "2022-07-17T00:00:00",
    //     "2022-07-18T01:30:00",
    //     "2022-07-19T02:30:00",
    //     "2022-07-20T03:30:00",
    //     "2022-07-21T04:30:00",
    //     "2022-07-22T05:30:00",
    //     "2022-07-23T06:30:00",
    //     "2022-07-24T03:30:00",
    //     "2022-07-25T04:30:00",
    //     "2022-07-26T05:30:00",
    //     "2022-07-27T01:30:00",
    //     "2022-07-28T02:30:00",
    //     "2022-07-29T03:30:00",
    //     "2022-07-30T04:30:00",
    //     "2022-07-31T05:30:00",
    //     "2022-08-01T06:30:00",
    //     "2022-08-02T03:30:00",
    //     "2022-08-03T04:30:00",
    //     "2022-08-04T05:30:00",
    //     "2022-08-05T06:30:00",
    // ];

    const catArr = props ? props?.date : "";

    let cat = ''
    const [state, setState] = useState(
        {
            series: [
                {
                    name: "series1",
                    // data: props ? props?.seriesOne : [31, 40, 48, 51, 48, 59, 50, 67, 78, 57, 77, 87, 98, 56, 91, 150, 51, 150, 91, 167, 0, 187, 167, 132, 145, 182, 134, 200, 180, 170],

                    data: props ? props?.seriesOne : "",

                },
                {
                    name: "series2",
                    // data: props ? props?.seriesTwo : [11, 32, 45, 32, 34, 52, 41, 34, 61, 45, 67, 49, 89, 39, 82, 40, 100, 90, 130, 89, 89, 67, 87, 98, 90, 30, 38, 49, 79, 132],

                    data: props ? props?.seriesTwo : "",


                },
            ],
            options: {
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 3,
                },
                colors: ["#159B9C", "#34C38F"],
                xaxis: {
                    type: "datetime",
                    categories: catArr,
                    //categories: valueThree,
                    tooltip: {
                        enabled: true,
                        formatter: function (val, options) {
                            const date = new Date(moment(cat).format("MMMM DD YYYY"));
                            const subtractMonths = date => {
                                date.setMonth(date.getMonth() - 1);
                                return date;
                            }
                            const d = new Date(subtractMonths(date));
                            return moment(d).format("MMMM DD YYYY");
                        },
                        offsetY: 0,
                    },
                    labels: {
                        show: false,
                    }
                },
                grid: {
                    borderColor: "#F1F1F1",
                },
                tooltip: {
                    x: {
                        format: "MMMM dd yyyy",
                    },
                },
                chart: {
                    events: {
                        mouseMove: function (event, chartContext, config) {
                            cat = catArr[config.dataPointIndex]
                        }
                    }
                },
                legend: {
                    show: false,
                }
            },
        }
    )

    useEffect(() => {

        if (!seen) {
            props.getDeshboardInsightsPropertyData();

        }


        // if (props.dashboardInsightsPropertyData) {
        //     console.log("======== xxxxx===========");
        //     setValueOne(props.dashboardInsightsPropertyData?.series[0]?.data)
        //     setValueTwo(props.dashboardInsightsPropertyData?.series[1]?.data)
        //     setValueThree(props.dashboardInsightsPropertyData?.xaxis?.categories)


        //     // setValueOne(prev => ({ ...prev, valueOne: props.dashboardInsightsPropertyData?.series[0]?.data }));
        //     // setValueTwo(prev => ({ ...prev, valueTwo: props.dashboardInsightsPropertyData?.series[1]?.data }));
        //     // setValueThree(prev => ({ ...prev, valueThree: props.dashboardInsightsPropertyData?.xaxis?.categories }));
        // }
        setSeen(true);

    }, [props]);

    // console.log(props.dashboardInsightsPropertyData?.series[0]?.data);
    // console.log(props.dashboardInsightsPropertyData?.series[1]?.data)
    // console.log(props.dashboardInsightsPropertyData?.xaxis?.categories);
    // console.log(props.dashboardInsightsPropertyData);
    // console.log("Helllo----------------");
    // console.log(state);
    // console.log(valueOne);
    // console.log(valueTwo);
    // console.log(valueThree);

    // console.log(props.seriesOne);
    // console.log(props.seriesTwo);
    // console.log(props.date);

    return (
        <React.Fragment>
            <ReactApexChart
                options={state?.options}
                series={state?.series}
                type="area"
                height="230"
                className="apex-charts"
            />
        </React.Fragment>
    )
}
//export default SplineArea2

const mapStateToProps = gstate => {
    const {
        dashboardInsightsPropertyData,
        seriesOne,
        seriesTwo,
        date,
    } = gstate.Dashboard;
    return {
        dashboardInsightsPropertyData,
        seriesOne,
        seriesTwo,
        date,
    }
};


export default connect(
    mapStateToProps,
    { getDeshboardInsightsPropertyData }
)(withTranslation()(SplineArea2));
