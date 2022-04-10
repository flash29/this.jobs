import React from 'react';
import "./Popup.css";
import { useNavigate } from "react-router-dom";

function Popup(props) {
    
    console.log(props);
    let navigate = useNavigate();
    const handleClick = () => {
        let path = "/";
        navigate(path);
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

export default Popup;