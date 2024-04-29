import React from 'react'
import Select from "react-select";
import { FormGroup } from 'reactstrap';


function SelectSearch({ value, handler, options, placeholder }) {
    return (

        <div className="mb-3 select2-container">
            <Select
                value={value}
                onChange={handler}
                options={options}
                // classNamePrefix="select2-selection"
                styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                }}
                placeholder={placeholder}

            />
        </div>

    )
}

export default SelectSearch