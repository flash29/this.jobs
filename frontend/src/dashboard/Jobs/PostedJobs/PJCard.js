import './PJCard.css';
import React from 'react';
import moment from 'moment'


function PJCard(props) {

    const {
        jobId, 
        createdAt,
        validTill,
        jobtitle,
        location ,
        org
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

    const clickHandler = () => {
        props.descSet(props.index);
    }

    return (
      <div className = 'CardType2'>
            <div className='fullClass2' onClick = {clickHandler}>
                <div className='PostTag3' id = "OrganisationName" >{org}   </div>
                <div className='PostTag2' id = "jobTitleName" >{jobtitle}   </div>
                <div className='PostTag2' id = "locationName" > Location: {location}</div>
                <div className="topCard2">
                    <div className='timeDisplay2'  >valid till: {moment(validTill).format("MM-DD-YYYY")}</div> 
                    <div className='timeDisplay2'  >Job-id : {jobId}</div> 
                </div>
                <div className="topCard2">
                    <div className='timeDisplay2'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default PJCard;