import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import { getDeshboardInsightsPropertyData } from 'store/actions';
import { withTranslation } from "react-i18next";

const SplineArea2 = (props) => {
    const [seen, setSeen] = useState(false);
    const [state, setState] = useState(
        {
            series: [
                {
                    name: "series1",
                    //data: [34, 40, 28, 52, 42, 109, 100],
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 460, 460, 460, 461, 462, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 467, 467],
                    data: props.dashboardInsightsPropertyData?.series[0]?.data,
                },
                {
                    name: "series2",
                    // data: [32, 60, 34, 46, 34, 52, 41],
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 460, 460, 460, 461, 462, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 467, 467],
                    data: props.dashboardInsightsPropertyData?.series[1]?.data,
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

                colors: ["#159B9C", "#34c38f"],
                xaxis: {
                    type: "datetime",
                    // categories: [
                    //     "2018-09-19T00:00:00",
                    //     "2018-09-19T01:30:00",
                    //     "2018-09-19T02:30:00",
                    //     "2018-09-19T03:30:00",
                    //     "2018-09-19T04:30:00",
                    //     "2018-09-19T05:30:00",
                    //     "2018-09-19T06:30:00",
                    // ],
                    categories: props.dashboardInsightsPropertyData?.xaxis?.categories,
                },

                grid: {
                    borderColor: "#f1f1f1",
                },
                tooltip: {
                    x: {
                        format: "dd/MM/yy HH:mm",
                    },
                },
            },
        }
    )

    useEffect(() => {



        if (!seen) {
            props.getDeshboardInsightsPropertyData();

        }
        setSeen(true);
    }, [props]);

    console.log(props.dashboardInsightsPropertyData?.series[0]?.data);
    console.log(props.dashboardInsightsPropertyData?.series[1]?.data);
    console.log(props.dashboardInsightsPropertyData?.xaxis[0]?.categories);
    console.log(props.dashboardInsightsPropertyData?.xaxis?.categories);
    console.log(props.dashboardInsightsPropertyData);
    console.log("Helllo----------------");
    return (
        <React.Fragment>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    )
}

//export default SplineArea2


const mapStateToProps = gstate => {
    const {
        dashboardInsightsPropertyData
    } = gstate.Dashboard;
    return {
        dashboardInsightsPropertyData
    }
};


export default connect(
    mapStateToProps,
    { getDeshboardInsightsPropertyData }
)(withTranslation()(SplineArea2));
