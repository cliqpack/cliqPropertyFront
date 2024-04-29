import React, { useState } from 'react'
import { Tooltip } from 'reactstrap'

export default function BootstrapTooltip({ text, id }) {
    const [state, setState] = useState({
        tooltipOpen: false
    })
    const toggle = () => {
        setState({ ...state, tooltipOpen: !state.tooltipOpen })
    }
    return (
        <div className='ms-2'>
            <div className="mr-1" color="secondary" id={'Tooltip-' + id}>
                <i className='fas fa-info-circle me-2' />
            </div>
            <Tooltip placement={'right'} isOpen={state.tooltipOpen} target={'Tooltip-' + id} toggle={toggle}>
                {text}
            </Tooltip>
        </div>
    )
}
