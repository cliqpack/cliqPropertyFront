import React, { useEffect, useState, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Select from "react-select"



const Labels = (props) => {
    const history = useHistory();
    const [optionGroup, setOptionGroup] = useState([
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" }
    ]
    )



    return (<div>
        <div className="mb-3 select2-container">

            <Select
                value={props.selectedMulti}
                isMulti={true}
                onChange={props.handleMulti}
                options={optionGroup}
                classNamePrefix="select2-selection"
            />
        </div>
    </div>);
}

export default Labels;