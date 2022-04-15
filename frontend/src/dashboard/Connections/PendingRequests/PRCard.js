import './PRCard.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { useState} from 'react';

function PRCard(props){
    
    let navigate = useNavigate();

    const {
        requestId,
        requestedFrom,
        requestorName,
        requestedTo
    } = props.postContent;

    const clickHandler = () => {
        console.log(props.requestedFrom)
        let path = "/settings/profile/"+requestedFrom;
        navigate(path);
    }

    const acceptButton = () => {
            console.log("Entered Accept");

            fetch('/acceptconnection', {
                method : 'POST', 
                headers:{'Content-type':'application/json'},
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(props.postContent),
            }).then(response => response.json()).then(data => {
                console.log(data);
                window.location.reload(false)
            }).catch(error => console.log('error', error))
    }

    return (
        <div className='listCardJobs3'>
            <div className='jobTitleList3'  onClick={clickHandler}> 
                <div>
                    {requestorName}  
                </div>
            </div>
            <div className = "bdiv">
                <Button className = "accept-button" variant="text" onClick = {acceptButton} >Accept</Button>
                <Button className = "decline-button" variant="text">Decline</Button>
            </div>
            
        </div>
    );
}

export default PRCard;