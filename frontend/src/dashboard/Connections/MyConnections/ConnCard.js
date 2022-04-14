import './ConnCard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ConnCard(props) {
    let navigate = useNavigate();

    const {
        userId,
        useremail,
        username,
        password,
        picture,
        resumepath,
        following,
        createdAt,
        updatedAt,
        bio,
        education,
        projects,
        jobhistory
    } = props.postContent;

    const clickHandler = () => {
        let path = "/settings/profile/"+userId;
        navigate(path);
    }

    return (

        <div className = "mainDiv5">
            <div className='listCardJobs5' onClick={clickHandler}>
                <div className='jobTitleList5'> {username} </div>
            </div>
        </div>
        
      
    );
  }
  
  export default ConnCard;
