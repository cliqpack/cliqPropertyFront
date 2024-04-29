import React from "react"
import logo from "../../assets/images/Asset-light.png";
import { Link } from "react-router-dom";
import logoDarkNew from "../../assets/images/new_myday_image.svg";
export default function ReportHeader() {
    return <div className="d-flex justify-content-between align-items-center px-4 bg-info">
        <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
                <img src={logo} alt="" height="30" />
            </span>
            <span className="logo-lg">
                <img src={logoDarkNew} alt="" height="30" />
            </span>
        </Link>

        <Link to="/" className="logo logo-light">
            <span className="logo-sm">
                <img src={logo} alt="" height="30" />
            </span>
            <span className="logo-lg">
                <img src={logoDarkNew} alt="" height="30" />
            </span>
        </Link>
    </div>
}