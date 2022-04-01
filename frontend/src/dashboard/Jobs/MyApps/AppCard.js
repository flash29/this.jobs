import './AppCard.css';
import React, { useState, useEffect } from 'react';

function AppCard(props) {

    const {
        jobID,
        userID,
        content, 
        createdAt, 
        updatedAt,
        appliedUsersList,
        attachments,
        validTill,
        jobTitle, 
        location, 
        org,
        salary
    } = props.postContent;

    let timeOfApplication = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - createdAt)/(60*60*24) ;
        if(differenceDate<1){
            // console.log('check proper time here', differenceDate*24 );
            differenceDate = differenceDate *24;
            // eslint-disable-next-line no-useless-concat
            timeOfApplication = Math.floor(differenceDate) + ' ' + 'Hours Ago';
        }
        else{
            // eslint-disable-next-line no-useless-concat
            timeOfApplication = Math.floor(differenceDate) + ' ' + 'Days Ago';
        }
    }
    createDate();

    return (
      <div className = 'CardType'>
            <div className='fullClassTwo'>
                <div className='PostTag'>{org}  {content}</div>
                <div className='PostTag'>location : {location}</div>
                {/* <div className='PostTag'>{arr.content}</div> */}
                <div className="topCard">
                    <div className='timeDisplay'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default AppCard;
