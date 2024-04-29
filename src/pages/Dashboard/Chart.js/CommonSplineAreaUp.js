import BootstrapTooltip from 'common/Tooltip/BootstrapTooltip';
import CommonTooltip from 'common/Tooltip/CommonTooltip'
import React, { useState } from 'react'
import {

    Tooltip,
} from "reactstrap";

const CommonSplineAreaUp = ({ left, right, id }) => {


    return (
        <div className="w-100 d-flex justify-content-between align-items-center pb-2">
            <span>{left}</span>
            {/* <CommonTooltip text={right} id={id} /> */}
            {/* <Tooltip
                placement="right"
                isOpen={state?.left}
                target="TooltipRight"
                toggle={() =>
                    setState({ left: !state?.left })
                }
            >
                {right}
            </Tooltip>



            <div
                className='p-1'
                id="TooltipRight"
            >
                <i className='fas fa-info-circle' />
            </div> */}
            {/* <div className="mr-1" color="secondary" id={'Tooltip-' + id}>
                <i className='fas fa-info-circle me-2' />
            </div>
            <Tooltip placement={'right'} isOpen={state.tooltipOpen} target={'Tooltip-' + id} toggle={toggle}>
                {right}
            </Tooltip> */}
            <BootstrapTooltip text={right} id={id} />
        </div>
    )
}

export default CommonSplineAreaUp
