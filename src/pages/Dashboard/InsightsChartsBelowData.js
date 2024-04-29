import moment from 'moment'
import React from 'react'

export default function InsightsChartsBelowData({ data, date, color }) {
    return (
        <div className="d-flex flex-column">
            <span className={`${color ? 'text-info' : 'text-dark'}`} style={{ fontSize: '24px' }}>
                {data?.[data.length - 1]}
            </span>
            <span>
                {
                    moment(date?.[date.length - 1]).format('DD MMM')

                }
            </span>
        </div>
    )
}
