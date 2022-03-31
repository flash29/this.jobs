import './PJCard.css';
import React, { useState, useEffect } from 'react';

function PJCard() {

    // const {
    //     appId,
    //     appliedOn,
    //     company,
    // } = props.AppContent;


    const arr = {jobId: 2,
        createdBy: "User2",
        content: "Backend developer II",
        createdAt: 1648487349,
        updatedAt: 1648487629,
        appliedUsersList: null,
        attachments: ""}



    // console.log('jobId', arr.jobId);
    let timeOfApplication = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - arr.createdAt)/(60*60*24) ;
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
      <div className = 'CardType2'>
            <div className='fullClass2'>
                <div className='PostTag2'>{arr.jobId}  {arr.content}</div>
                {/* <div className='PostTag'>{arr.content}</div> */}
                <div className="topCard2">
                    <div className='timeDisplay2'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default PJCard;