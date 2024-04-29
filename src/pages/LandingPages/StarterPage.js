import React from "react";
import { Button } from "reactstrap";
import './StarterPage.css';
import { Link } from "react-router-dom";

const StarterPage = () => {
    return (
        <React.Fragment>
            <div id="myNav" className="overlay">
                <div className="overlay-content">
                    <Link to="/login">Property Manager</Link>
                    <Link to="/owner-login">Owner</Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default StarterPage;