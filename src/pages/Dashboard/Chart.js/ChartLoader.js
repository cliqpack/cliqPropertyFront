import React from 'react'

function ChartLoader() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '230px' }}>
            <div className="spinner-grow text-primary m-1" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default ChartLoader
