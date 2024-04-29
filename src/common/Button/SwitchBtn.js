import React from 'react'
import Switch from "react-switch";


function SwitchBtn(props) {

    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2,
                }}
            >
                {" "}
                No
            </div>
        );
    };
    const OnSymbol = props => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2,
                }}
            >
                {" "}
                Yes
            </div>
        );
    };
    return (
        <>
            <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                className="me-1 mb-sm-8 mb-2"
                onColor="#153D58"
                onChange={() => props.handler(props.btn)}
                checked={props.state.btn}
            />
        </>
    )
}

export default SwitchBtn