import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts"
import moment from "moment";

const CommonSplineArea = ({ seriesOne, seriesTwo, date, text, }) => {
    const [scrollDate, setScrollDate] = useState()
    // console.log(scrollDate);
    const [isLoading, setIsLoading] = useState(false)
    // console.log(isLoading);

    // if (text == 'Tenant Arrears') {
    //     console.log(date);
    // }



    // const catArr = [
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
    // ]

    const catArr = date;

    let cat, dateOne;
    // console.log(cat);

    const [state, setState] = useState(

        {
            series: [
                {
                    name: `${text} `,
                    data: seriesOne,

                },
                {
                    name: `${text} `,
                    data: seriesTwo,

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
                    categories: catArr,
                    labels: {
                        show: false
                    },
                    tooltip: {
                        enabled: false,

                        // formatter:
                        //     function (val, options) {
                        //         console.log(val, options);
                        //         console.log(catArr[options.dataPointIndex]);
                        //         const date = new Date(moment(cat).format("MMMM DD YYYY"));
                        //         const subtractMonths = date => {
                        //             date.setMonth(date.getMonth() - 1);
                        //             return date;
                        //         }
                        //         const d = new Date(subtractMonths(date));
                        //         setScrollDate(catArr[options.dataPointIndex])

                        //         return moment(d).format("DD MMM YYYY")


                        //     },

                        offsetY: 0,
                    },
                    labels: {
                        show: false,
                    }
                },
                grid: {
                    borderColor: "#f1f1f1",
                },
                tooltip: {
                    x: {
                        show: false,
                        format: "dd MMM yyyy",
                    }
                },
                chart: {
                    events: {
                        mouseMove: function (event, chartContext, config) {

                            setScrollDate(catArr[config.dataPointIndex])
                            cat = catArr[config.dataPointIndex];

                        }
                    },
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: false | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                    },
                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                },
                legend: {
                    show: false,
                },

            },
        }
    )

    // console.log(state.series[0].name);

    useEffect(() => {
        setState(prev =>
        ({
            ...prev, series: [
                {
                    name: `${moment(scrollDate).format('DD MMM yyyy')} `,
                    data: seriesOne,

                },
                {
                    name: `${moment(scrollDate).subtract(1, 'months').format('DD MMM yyyy')} `,
                    data: seriesTwo,

                },
            ]
        }))

    }, [scrollDate])


    return (
        <React.Fragment>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height="230"
                className="apex-charts"
            />
        </React.Fragment>
    )
}

export default CommonSplineArea




