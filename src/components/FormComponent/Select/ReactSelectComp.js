import React, { Fragment } from "react";
import Select from "react-select";

export default function ReactSelectComp({ name, value, handler, options }) {
    return <Fragment>
        <div className="form-group-new">
            <Select
                value={value}
                onChange={handler}
                options={options}
                //classNamePrefix="select2-selection"
                className="form-control-new"
                style={{ border: "none" }}
            />
            <label htmlFor="usr">
                {name}
            </label>
        </div>
    </Fragment>
}