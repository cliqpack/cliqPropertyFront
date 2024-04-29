import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
const ReactAsyncSelectComp = (props) => {
    const callBackValue = (value, inputValue) => {
        return value.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    let timeout;
    const loadOptions = (inputValue = null, callBack) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        let authUser = JSON.parse(localStorage.getItem("authUser"));
        let url = props.url + inputValue;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + authUser.token,
        };
        let responseValue;
        timeout = setTimeout(() => {
            axios
                .get(url, { headers: headers })
                .then(response => {
                    responseValue = response?.data?.data.map(item =>
                    (
                        props.returnSelectObject(item)
                    ));
                    callBack(callBackValue(responseValue, inputValue));
                })
        }, 500);
    }
    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            onChange={props.handler}
            placeholder={props.placeholder}
            defaultOptions
        />
    );

}

export default ReactAsyncSelectComp;