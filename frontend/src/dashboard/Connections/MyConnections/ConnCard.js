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
      <div className = 'CardType2'>
            <div className='fullClassTwo2' onClick={clickHandler}>
                <div className='PostTag2'> {useremail} </div>
            </div>
            <div className='PostTag2'>{userId} </div>
      </div>  
      
    );
  }
  
  export default ConnCard;
