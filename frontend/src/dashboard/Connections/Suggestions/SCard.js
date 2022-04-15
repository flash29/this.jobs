import './SCard.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import Alerts from './Alerts';

function SCard(props){
    
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

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
        console.log(props.requestedFrom)
        let path = "/settings/profile/"+userId;
        navigate(path);
    }

    let userid = sessionStorage.getItem('userid');

    const [reqData, setReqData] = useState({ 
        requestedFrom : Number(userid),
	    requestedTo : userId
    });  

    const requestButton = () => {
            console.log("Entered Request");
            console.log(reqData);

            fetch('/requestconnection', {
                method : 'POST', 
                headers:{'Content-type':'application/json'},
                headers:{'Authorization' : 'Bearer ' + sessionStorage.getItem('token')},
                body:JSON.stringify(reqData),
            }).then(response => response.json()).then(data => {
                console.log(data);
                console.log(data.error);

                if(data.error == undefined){
                    setMessage("Request Sent!");
                    setStatus(true); 
                }
                else{
                    setMessage(data.error)
                    // let path = "/home";
                    // navigate(path);
                    setStatus(true);
                }

                // window.location.reload(false)
            }).catch(error => console.log('error', error))
    }

    return (
        <div className='listCardJobs3'>
            <div className='jobTitleList3'  onClick={clickHandler}> 
                <div>
                    {username}  
                </div>
            </div>
            <div className = "bdiv">
                <Button className = "accept-button" variant="text" onClick = {requestButton} >Request</Button>
                {/* <Button className = "decline-button" variant="text">Remove</Button> */}
            </div>
            <Alerts trigger = {status} url = "/connections" msg = {message} setStatus = {setStatus}>
                    <h1>Alert!</h1>
                    <h3>{message}</h3>
            </Alerts> 
            
        </div>
    );
}

export default SCard;