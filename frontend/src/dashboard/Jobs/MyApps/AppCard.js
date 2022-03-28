import './AppCard.css';
import React, { useState, useEffect } from 'react';

function AppCard(props) {

    const [color, setColor] = useState('rgba(243, 242, 242)');

    const {
        appId,
        appliedOn,
        company,
    } = props.AppContent;

    console.log('appId', appId);
    let timeOfApplication = '';

    function createDate(){
        let  currentTime= Math.floor(Date.now()/1000);
        let differenceDate = (currentTime - appliedOn)/(60*60*24) ;
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
            <div className='fullClass'>
                <div className='PostTag'>{company}</div>
                <div className="topCard">
                    <div className='timeDisplay'  >{timeOfApplication}</div> 
                </div>
            </div>
      </div>  
      
    );
  }
  
  export default AppCard;