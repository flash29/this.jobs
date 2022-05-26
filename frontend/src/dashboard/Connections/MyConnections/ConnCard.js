import './ConnCard.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

function ConnCard(props) {
    let navigate = useNavigate();

    const {
        userId,
        username,
    } = props.postContent;

    const clickHandler = () => {
    
        let path = "/settings/profile/"+userId;
        navigate(path);
    }

    console.log(username);
    return (

        <div className = "mainDiv5">
            <div className='listCardJobs5' onClick={clickHandler}>
                <div className='jobTitleList5'> {username} </div>
            </div>
        </div>      
    );    
  }
  
  export default ConnCard;
