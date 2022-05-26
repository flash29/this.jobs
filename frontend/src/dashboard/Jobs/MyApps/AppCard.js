import './AppCard.css';
import React from 'react';

function AppCard(props) {

    const {

        createdAt, 
        jobtitle, 
        location, 
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

    return (
      <div className = 'CardType'>
            <div className='fullClassTwo'>
                <div className='PostTag'>{org} </div>
                <div className='PostTag'> {jobtitle} </div>
                <div className='PostTag'>Location : {location}</div>
                {/* <div className='PostTag'>{arr.content}</div> */}
                <div className="topCard">
                    <div className='timeDisplay'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default AppCard;
