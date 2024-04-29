import React, { useEffect, useState, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";



const DummyPage = () => {
    const history = useHistory();

    setTimeout(() => {
        history.push('/messages');

    }, 10);

    return (<div>
        <h1>hi</h1>
    </div>);
}

export default DummyPage;