import './PJCard.css';
import React, { useState, useEffect } from 'react';
import  { useParams } from "react-router-dom";

function PJCard(props) {
    let params = useParams();
    // const {
    //     appId,
    //     appliedOn,
    //     company,
    // } = props.AppContent;


    const {
        jobId,
        company,
        createdBy,
        content,
        createdAt,
        updatedAt,
        appliedUsersList,
        attachments,
        validTill
    } = props.postContent;

    const [postData, setPostData] = useState({ 
        userId : 1, 
        jobId : 1
    });  

    let userid = sessionStorage.getItem('userid');
    postData.userId = Number(userid)
    let jobid = jobId

    // console.log('jobId', arr.jobId);
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

    function handleSubmit(){
        console.log(postData.userId);
        
    }

    return (
      <div className = 'CardType2'>
            <div className='fullClass2' onClick={handleSubmit}>
                <div className='PostTag2' >{company} {content}  </div>
                <div className='PostTag2'> Job-id: {jobId}</div>
                <div className="topCard2">
                    <div className='timeDisplay2'  >valid till: {validTill}</div> 
                </div>
                <div className="topCard2">
                    <div className='timeDisplay2'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default PJCard;