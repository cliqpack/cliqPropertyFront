import React from "react"
import ReactEcharts from "echarts-for-react"

const AccountPieChart = (props) => {
    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "350px" }} option={props.getOption()} />
        </React.Fragment>
    )
}
export default AccountPieChart
