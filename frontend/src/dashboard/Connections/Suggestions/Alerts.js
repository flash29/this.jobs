import React from 'react';
import "./Alerts.css";
import { useNavigate } from "react-router-dom";

function Alerts(props) {
    
    console.log(props);

    let navigate = useNavigate();
    const handleClick = () => {
        let path = props.url;
        navigate(path);
        props.setStatus(false);
    }

    return(
        props.trigger
        ?
        <div className = "popup">
            <div className = "popup-inner">
                <button className = "close-btn" onClick={handleClick}>Close</button>
                {props.children}
            </div>
        </div>
        :
        ""
    )
}

export default Alerts;